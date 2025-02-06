import prismaClient from './prisma/prismaClient';
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { ISP } from '../model/isp';
import { UpdateISPView, ISPShort, UpdateByStudentISPView } from '../types/ispDTO';

const findAll = tryCatchWrapper(async (): Promise<ISP[]> => {
    const isps = await prismaClient.isp.findMany({
        include: {
            courses: true,
            student: true,
        },
    });
    return isps.map(ISP.from);
});

const findAllShort = tryCatchWrapper(async (): Promise<ISPShort[]> => {
    const isps = await prismaClient.isp.findMany({
        select: {
            id: true,
            status: true,
            totalCredits: true,
            startYear: true,
            student: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return isps;
});

const findById = tryCatchWrapper(async (id: number): Promise<ISP> => {
    const isp = await prismaClient.isp.findUnique({
        where: { id },
        include: {
            student: true,
        },
    });
    if (!isp) {
        throw new Error(ERROR_ISP_NOT_FOUND);
    }
    const courses = await prismaClient.course.findMany({
        where: {
            isps: {
                some: {
                    ispId: id,
                },
            },
        },
    });

    return ISP.fromIncludeAll({
        ...isp,
        courses,
    });
});

const findAllByStudentId = tryCatchWrapper(async (studentId: number): Promise<ISP[]> => {
    const isps = await prismaClient.isp.findMany({
        where: { studentId },
        include: {
            student: true,
        },
    });
    return isps.map(ISP.from);
});

const findAllByCourseId = tryCatchWrapper(async (courseId: number): Promise<ISP[]> => {
    const isps = await prismaClient.isp.findMany({
        where: {
            courses: {
                some: {
                    courseId,
                },
            },
        },
        include: {
            student: true,
        },
    });
    return isps.map(ISP.from);
});

const existsById = tryCatchWrapper(async (id: number): Promise<boolean> => {
    const isp = await prismaClient.isp.findUnique({
        where: { id },
    });
    return !!isp;
});

const existsByStudentIdAndStartYear = tryCatchWrapper(
    async (studentId: number, startYear: number): Promise<boolean> => {
        const isp = await prismaClient.isp.findUnique({
            where: {
                startYear_studentId: {
                    startYear,
                    studentId,
                },
            },
        });
        return !!isp;
    }
);

const create = tryCatchWrapper(async (ispInfo: UpdateISPView): Promise<ISP> => {
    let createdISP = await prismaClient.isp.create({
        data: {
            studentId: ispInfo.studentId,
            status: ispInfo.status || 'NOTSUBMITTED',
            totalCredits: ispInfo.totalCredits,
            startYear: ispInfo.startYear,
        },
        include: {
            student: true,
        },
    });

    await prismaClient.courseAddedISP.createMany({
        data: ispInfo.courses.map((courseId) => ({
            ispId: createdISP.id,
            courseId,
        })),
    });

    return ISP.from(createdISP);
});

const update = tryCatchWrapper(async (id: number, ispInfo: UpdateISPView): Promise<ISP> => {
    await prismaClient.courseAddedISP.deleteMany({
        where: {
            ispId: id,
        },
    });

    await prismaClient.courseAddedISP.createMany({
        data: ispInfo.courses.map((courseId) => ({
            ispId: id,
            courseId,
        })),
    });

    const updatedISP = await prismaClient.isp.update({
        where: { id },
        data: {
            studentId: ispInfo.studentId,
            status: ispInfo.status || 'NOTSUBMITTED',
            totalCredits: ispInfo.totalCredits,
            startYear: ispInfo.startYear,
        },
        include: {
            student: true,
        },
    });

    return ISP.from(updatedISP);
});

const updateStatusAndCourses = tryCatchWrapper(async (id: number, ispInfo: UpdateByStudentISPView): Promise<ISP> => {
    await prismaClient.courseAddedISP.deleteMany({
        where: {
            ispId: id,
        },
    });

    await prismaClient.courseAddedISP.createMany({
        data: ispInfo.courses.map((courseId) => ({
            ispId: id,
            courseId,
        })),
    });

    const updatedISP = await prismaClient.isp.update({
        where: { id },
        data: {
            status: ispInfo.status || 'NOTSUBMITTED',
        },
        include: {
            student: true,
        },
    });

    return ISP.from(updatedISP);
});

const deleteById = tryCatchWrapper(async (id: number): Promise<void> => {
    await prismaClient.courseAddedISP.deleteMany({
        where: {
            ispId: id,
        },
    });

    await prismaClient.isp.delete({
        where: { id },
    });
});

const deleteByStudentId = tryCatchWrapper(async (studentId: number): Promise<void> => {
    await prismaClient.courseAddedISP.deleteMany({
        where: {
            isp: {
                studentId,
            },
        },
    });

    await prismaClient.isp.deleteMany({
        where: {
            studentId,
        },
    });
});

const ERROR_ISP_NOT_FOUND = 'ISP not found';
const ERROR_ISP_EXISTS = (studentId: number, startYear: number) =>
    `An ISP for student ID ${studentId} already exists for the year ${startYear}`;

export default {
    findAll,
    findAllShort,
    findById,
    findAllByStudentId,
    findAllByCourseId,
    existsById,
    existsByStudentIdAndStartYear,
    create,
    update,
    updateStatusAndCourses,
    deleteById,
    deleteByStudentId,
};

export const errorMessages = {
    ERROR_ISP_NOT_FOUND,
    ERROR_ISP_EXISTS,
};
