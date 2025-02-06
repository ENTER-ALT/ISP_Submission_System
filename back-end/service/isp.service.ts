import { ISP } from '../model/isp';
import ISPRepository from '../repository/isp.db';
import CourseService from './course.service';
import { UpdateByStudentISPView, UpdateISPView } from '../types/ispDTO';
import studentService from './student.service';

const getAll = async (): Promise<ISP[]> => {
    return await ISPRepository.findAll();
};

const getAllShort = async (): Promise<ISP[]> => {
    return await ISPRepository.findAllShort();
};

const getISPById = async (id: number): Promise<ISP> => {
    return await ISPRepository.findById(id);
};

const getAllByStudentId = async (studentId: number): Promise<ISP[]> => {
    return await ISPRepository.findAllByStudentId(studentId);
};

const getAllByCourseId = async (courseId: number) : Promise<ISP[]> => {
    return ISPRepository.findAllByCourseId(courseId);
}

const createISP = async (ispInfo: UpdateISPView): Promise<ISP> => {
    await throwErrorIfExistsByStudentIdAndStartYear(ispInfo.studentId, ispInfo.startYear);

    let courses = [];
    for (const courseId of ispInfo.courses) {
        let course = await CourseService.getCourseById(courseId);
        courses.push(course);
    }

    let student = await studentService.getStudentById(ispInfo.studentId);

    ISP.validateISP({
        student: student,
        status: ispInfo.status || 'NOTSUBMITTED',
        totalCredits: ispInfo.totalCredits,
        startYear: ispInfo.startYear
    });

    return await ISPRepository.create(ispInfo);
};

const updateISP = async (id: number, ispInfo: UpdateISPView): Promise<ISP> => {
    await throwErrorIfNotExist(id);

    const existingISP: ISP = await getISPById(id);
    let courses = [];
    for (const courseId of ispInfo.courses) {
        let course = await CourseService.getCourseById(courseId);
        courses.push(course);
    }

    let student = await studentService.getStudentById(ispInfo.studentId);

    if (existingISP.startYear !== ispInfo.startYear ||
        existingISP.student.id !== ispInfo.studentId) {
        await throwErrorIfExistsByStudentIdAndStartYear(ispInfo.studentId, ispInfo.startYear);
    }

    ISP.validateISP({
        student: student,
        status: ispInfo.status || existingISP.status,
        totalCredits: ispInfo.totalCredits || existingISP.totalCredits,
        startYear: ispInfo.startYear || existingISP.startYear,
    });

    return await ISPRepository.update(id, ispInfo);
};

const updateISPByStudent = async (id: number, ispInfo: UpdateByStudentISPView): Promise<ISP> => {
    await throwErrorIfNotExist(id);

    return await ISPRepository.updateStatusAndCourses(id, ispInfo);
};

const deleteISPById = async (id: number): Promise<string> => {
    await throwErrorIfNotExist(id);
    await ISPRepository.deleteById(id);
    return 'ISP deleted successfully';
};

const deleteISPByStudentId = async (studentId: number): Promise<string> => {
    await throwErrorIfNotExist(studentId);
    await ISPRepository.deleteByStudentId(studentId);
    return 'ISP deleted successfully';
}

const throwErrorIfNotExist = async (id: number): Promise<void> => {
    const exists: boolean = await ISPRepository.existsById(id);
    if (!exists) {
        throw new Error(ERROR_ISP_NOT_EXIST);
    }
};

const throwErrorIfExistsByStudentIdAndStartYear = async (studentId: number, startYear: number): Promise<void> => {
    const exists: boolean = await ISPRepository.existsByStudentIdAndStartYear(studentId, startYear);
    if (exists) {
        throw new Error(ERROR_ISP_EXISTS(studentId, startYear));
    }
};

const ERROR_ISP_NOT_EXIST = 'The ISP does not exist';
const ERROR_ISP_EXISTS = (studentId: number, startYear: number) => `An ISP for student ID ${studentId} already exists for the year ${startYear}`;

export default {
    getAll,
    getAllShort,
    getISPById,
    getAllByStudentId,
    getAllByCourseId,
    createISP,
    updateISP,
    updateISPByStudent,
    deleteISPById,
    deleteISPByStudentId,
    throwErrorIfNotExist,
};

export const errorMessages = {
    ERROR_ISP_NOT_EXIST,
    ERROR_ISP_EXISTS,
};