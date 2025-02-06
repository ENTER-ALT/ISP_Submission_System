import { Course } from '../model/course';
import { Student } from '../model/student';
import StudentRepository from '../repository/student.db';
import ispService from './isp.service';
import CourseService from './course.service';
import { StudentUpdateView } from '../types/studentDTO';
import bcrypt from 'bcrypt';
import { UserShort } from '../types/userDTO';

const getAll = async (): Promise<Student[]> => {
    return await StudentRepository.findAll();
};

const getAllShort = async (): Promise<UserShort[]> => {
    return await StudentRepository.findAllShort();
}

const getStudentById = async (id: number): Promise<Student> => {
    return await StudentRepository.findById(id);
};

const getAllByPassedCourseId = async (courseId: number): Promise<Student[]> => {
    return await StudentRepository.findAllByPassedCourseId(courseId);
};

const createStudent = async (studentInfo: StudentUpdateView): Promise<Student> => {
    await throwErrorIfExistsByEmail(studentInfo.email);

    const hashedPassword = await bcrypt.hash(studentInfo.password, 12);

    let passedCourses: Course[] = [];
    for (const courseId of studentInfo.passedCourses) {
        let course: Course = await CourseService.getCourseById(courseId);
        passedCourses.push(course);
    }

    Student.validateStudent({
        name: studentInfo.name,
        email: studentInfo.email,
        password: hashedPassword,
        nationality: studentInfo.nationality || null,
        studyYear: studentInfo.studyYear || null,
        passedCourses: passedCourses,
    });

    studentInfo.password = hashedPassword;

    return await StudentRepository.create(studentInfo);
};

const updateStudent = async (id: number, studentInfo: StudentUpdateView): Promise<Student> => {
    await throwErrorIfNotExist(id);

    const existingStudent: Student = await getStudentById(id);
    const hashedPassword = studentInfo.password ? await bcrypt.hash(studentInfo.password, 12) : existingStudent.password;

    let passedCourses: Course[] = [];
    for (const courseId of studentInfo.passedCourses) {
        let course: Course = await CourseService.getCourseById(courseId);
        passedCourses.push(course);
    }

    Student.validateStudent({
        name: studentInfo.name || existingStudent.name,
        email: studentInfo.email || existingStudent.email,
        password: hashedPassword,
        nationality: studentInfo.nationality || existingStudent.nationality,
        studyYear: studentInfo.studyYear || existingStudent.studyYear,
        passedCourses: passedCourses || existingStudent.passedCourses, 
    });

    studentInfo.password = hashedPassword

    return await StudentRepository.update(id, studentInfo);
};

const deleteStudentById = async (id: number): Promise<string> => {
    await throwErrorIfNotExist(id);
    await ispService.deleteISPByStudentId(id);
    await StudentRepository.deleteById(id);
    return 'Student deleted successfully';
};

const throwErrorIfNotExist = async (id: number): Promise<void> => {
    const exists: boolean = await StudentRepository.existsById(id);
    if (!exists) {
        throw new Error(ERROR_STUDENT_NOT_EXIST);
    }
};

const throwErrorIfExistsByEmail = async (email: string): Promise<void> => {
    const exists: boolean = await StudentRepository.existsByEmail(email);
    if (exists) {
        throw new Error(ERROR_STUDENT_EXISTS(email));
    }
};

const ERROR_STUDENT_NOT_EXIST = 'The student does not exist';
const ERROR_STUDENT_EXISTS = (email: string) => `A student with email ${email} already exists`;

export default {
    getAll,
    getAllShort,
    getStudentById,
    getAllByPassedCourseId,
    createStudent,
    updateStudent,
    deleteStudentById,
};

export const errorMessages = {
    ERROR_STUDENT_NOT_EXIST,
    ERROR_STUDENT_EXISTS,
};
