import prisma from '../repository/prisma/prismaClient';
import bcrypt from 'bcrypt';
import students from '../data/students';
import courses from '../data/courses';
import isp from '../data/isp';
import privileges from '../data/privilege';
import administratives from '../data/administrative';

import { ISP } from '../model/isp';
import { Student } from '../model/student';
import { Course } from '../model/course';
import { Privilege } from '../model/privilege';
import { Administrative } from '../model/administrative';
import { UserTypes } from '@prisma/client';

async function main() {
    await prisma.courseAddedISP.deleteMany();
    await prisma.isp.deleteMany();
    await prisma.studentPassedCourse.deleteMany();
    await prisma.administrativePrivilege.deleteMany();
    await prisma.user.deleteMany();
    await prisma.courseRequiredPassedCourses.deleteMany();
    await prisma.course.deleteMany();
    await prisma.privilege.deleteMany();

    for (const privilege of privileges) {
        await createPrivilege(privilege);
    }

    for (const course of courses) {
        await createCourse(course);
    }

    for (const student of students) {
        await createStudent(student);

        const passedCourses = student.passedCourses.map((course) => ({
            name: course.name,
            phase: course.phase,
        }));

        await connectStudentWithCourses(student.email, passedCourses);
    }

    for (const ispEntry of isp) {
        await createISP(ispEntry);
    }

    for (const course of courses) {
        await createPassedCoursesConnections(course);
    }

    for (const admin of administratives) {
        let createdAdmin = await createAdministrative(admin);
        await connectAdministrativesWithPrivileges(createdAdmin.id, admin.privileges);
    }
}

async function createPrivilege(privilege: Privilege) {
    return prisma.privilege.create({
        data: {
            id: privilege.id,
            name: privilege.name,
            description: privilege.description,
        },
    });
}

async function createAdministrative(admin: Administrative) {
    let hashedPassword = await bcrypt.hash(admin.password, 12);
    return prisma.user.upsert({
        where: { email: admin.email },
        update: {},
        create: {
            name: admin.name,
            email: admin.email,
            password: hashedPassword,
            userType: UserTypes.Administrative,
        },
    });
}

async function createStudent(student: Student) {
    let hashedPassword = await bcrypt.hash(student.password, 12);
    return prisma.user.create({
        data: {
            name: student.name,
            email: student.email,
            password: hashedPassword,
            userType: UserTypes.Student,
            nationality: student.nationality,
            studyYear: student.studyYear,
            isps: {
                create: [],
            },
            passedCourses: {
                create: [],
            },
            privileges: {
                create: [],
            },
        },
    });
}

async function createISP(isp: ISP) {
    let res = await prisma.isp.create({
        data: {
            totalCredits: isp.totalCredits,
            startYear: isp.startYear,
            status: isp.status,
            student: {
                connect: { email: isp.student.email },
            },
            courses: {
                create: [],
            },
        },
    });

    await connectISPWithCourses(res.id, isp.courses);
}

async function createCourse(course: Course) {
    return prisma.course.upsert({
        where: { name_phase: { name: course.name, phase: course.phase } },
        update: {},
        create: {
            name: course.name,
            description: course.description,
            phase: course.phase,
            credits: course.credits,
            isElective: course.isElective,
            lecturers: {
                set: course.lecturers,
            },
            isps: {
                create: [],
            },
            passedStudents: {
                create: [],
            },
        },
    });
}

async function createPassedCoursesConnections(course: Course) {
    const currentCourse = await prisma.course.findUnique({
        where: { name_phase: { name: course.name, phase: course.phase } },
    });

    if (!currentCourse) {
        throw new Error(`Course with name ${course.name} and phase ${course.phase} not found.`);
    }

    for (const requiredCourse of course.requiredPassedCourses) {
        const required = await prisma.course.findUnique({
            where: { name_phase: { name: requiredCourse.name, phase: requiredCourse.phase } },
        });

        if (!required) {
            throw new Error(
                `Required course with name ${requiredCourse.name} and phase ${requiredCourse.phase} not found.`
            );
        }

        await prisma.courseRequiredPassedCourses.upsert({
            where: {
                courseId_requiredCourseId: {
                    courseId: currentCourse.id,
                    requiredCourseId: required.id,
                },
            },
            update: {},
            create: {
                courseId: currentCourse.id,
                requiredCourseId: required.id,
            },
        });
    }
}

async function connectISPWithCourses(ispId: number, courses: Course[]) {
    const coursesToConnect = await prisma.course.findMany({
        where: {
            name: { in: courses.map((course) => course.name) },
            phase: { in: courses.map((course) => course.phase) },
        },
    });

    const courseConnections = coursesToConnect.map((course) => ({
        courseId: course.id,
        ispId: ispId ?? 0,
    }));

    await prisma.courseAddedISP.createMany({
        data: courseConnections,
    });
}

async function connectStudentWithCourses(
    studentEmail: string,
    passedCourses: { name: string; phase: number }[]
) {
    const student = await prisma.user.findUnique({
        where: { email: studentEmail },
    });

    if (!student) {
        throw new Error(`Student with email ${studentEmail} not found.`);
    }

    const coursesToConnect = await prisma.course.findMany({
        where: {
            name: { in: passedCourses.map((course) => course.name) },
            phase: { in: passedCourses.map((course) => course.phase) },
        },
    });

    if (coursesToConnect.length !== passedCourses.length) {
        throw new Error('Some of the passed courses were not found.');
    }

    const studentCourseConnections = coursesToConnect.map((course) => ({
        studentId: student.id,
        courseId: course.id,
    }));

    await prisma.studentPassedCourse.createMany({
        data: studentCourseConnections,
    });
}

async function connectAdministrativesWithPrivileges(
    adminId: number,
    privileges: Privilege[]
) {
    const privilegesToConnect = await prisma.privilege.findMany({
        where: {
            name: { in: privileges.map((privilege) => privilege.name) },
        },
    });

    const data = privilegesToConnect.map((privilege) => ({
        adminId: adminId,
        privilegeId: privilege.id,
    }));

    await prisma.administrativePrivilege.createMany({
        data: data,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
