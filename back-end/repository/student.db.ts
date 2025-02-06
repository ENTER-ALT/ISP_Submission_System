import prismaClient from './prisma/prismaClient';
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { Student } from '../model/student';
import { StudentUpdateView, StudentIncludeCourses } from '../types/studentDTO';
import { UserShort } from '../types/userDTO';
import { UserTypes } from '@prisma/client';

const findAll = tryCatchWrapper(async (): Promise<Student[]> => {
    const result = await prismaClient.user.findMany({
        where: {
            userType: UserTypes.Student,
        },
    });
    return result.map(Student.from);
});

const findAllShort = tryCatchWrapper(async (): Promise<UserShort[]> => {
    const result = await prismaClient.user.findMany({
        where: {
            userType: UserTypes.Student,
        },
        select: {
            id: true,
            name: true,
        },
    });
    return result;
});

const findById = tryCatchWrapper(async (id: number): Promise<StudentIncludeCourses> => {
    const student = await prismaClient.user.findUnique({
        where: { id },
        include: {
            passedCourses: {
                select: {
                    courseId: true,
                },
            },
        },
    });
    if (!student) {
        throw new Error(STUDENT_NOT_FOUND_ERROR);
    }
    return new StudentIncludeCourses(student);
});

const findAllByPassedCourseId = tryCatchWrapper(async (courseId: number): Promise<Student[]> => {
    const students = await prismaClient.user.findMany({
        where: {
            userType: UserTypes.Student,
            passedCourses: {
                some: {
                    courseId,
                },
            },
        },
    });
    return students.map(Student.from);
});

const existsById = tryCatchWrapper(async (id: number): Promise<boolean> => {
    const existingStudent = await prismaClient.user.findUnique({
        where: { id },
    });
    return !!existingStudent;
});

const existsByEmail = tryCatchWrapper(async (email: string): Promise<boolean> => {
    const existingStudent = await prismaClient.user.findUnique({
        where: { email },
    });
    return !!existingStudent;
});

const create = tryCatchWrapper(async (studentInfo: StudentUpdateView): Promise<Student> => {
    const student = await prismaClient.user.create({
        data: {
            name: studentInfo.name,
            email: studentInfo.email,
            password: studentInfo.password,
            nationality: studentInfo.nationality,
            studyYear: studentInfo.studyYear,
            userType: UserTypes.Student,
        },
    });

    // Link existing courses to the student
    if (studentInfo.passedCourses && studentInfo.passedCourses.length > 0) {
        await prismaClient.studentPassedCourse.createMany({
            data: studentInfo.passedCourses.map(courseId => ({
                studentId: student.id,
                courseId,
            })),
        });
    }

    return Student.from(student);
});

const update = tryCatchWrapper(async (id: number, studentInfo: StudentUpdateView): Promise<Student> => {
    const updatedStudent = await prismaClient.user.update({
        where: { id },
        data: {
            name: studentInfo.name,
            email: studentInfo.email,
            password: studentInfo.password,
            nationality: studentInfo.nationality,
            studyYear: studentInfo.studyYear,
        },
    });

    if (studentInfo.passedCourses && studentInfo.passedCourses.length > 0) {
        await prismaClient.studentPassedCourse.deleteMany({
            where: {
                studentId: id,
            },
        });

        await prismaClient.studentPassedCourse.createMany({
            data: studentInfo.passedCourses.map(courseId => ({
                studentId: id,
                courseId,
            })),
        });
    }

    return Student.from(updatedStudent);
});

const deleteById = tryCatchWrapper(async (id: number): Promise<void> => {
    await prismaClient.studentPassedCourse.deleteMany({
        where: {
            studentId: id,
        },
    });

    await prismaClient.user.delete({
        where: { id },
    });
});

const STUDENT_NOT_FOUND_ERROR = 'Student not found';

export default {
    findAll,
    findAllShort,
    findById,
    findAllByPassedCourseId,
    existsById,
    existsByEmail,
    create,
    update,
    deleteById,
};

export const errorMessages = {
    STUDENT_NOT_FOUND_ERROR,
};
