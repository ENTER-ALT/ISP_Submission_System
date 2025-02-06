import studentService from '../../service/student.service';
import StudentRepository from '../../repository/student.db';
import CourseService from '../../service/course.service';
import ispService from '../../service/isp.service';
import bcrypt from 'bcrypt';
import { StudentUpdateView } from '../../types/studentDTO';

jest.mock('../../repository/student.db');
jest.mock('../../service/course.service');
jest.mock('../../service/isp.service');
jest.mock('bcrypt');

describe('Student Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAll should return a list of students', async () => {
        const mockStudents = [
            { id: 1, name: 'Student 1', email: 'student1@test.com' },
            { id: 2, name: 'Student 2', email: 'student2@test.com' },
        ];

        StudentRepository.findAll = jest.fn().mockResolvedValue(mockStudents);

        const result = await studentService.getAll();

        expect(result).toEqual(mockStudents);
        expect(StudentRepository.findAll).toHaveBeenCalledTimes(1);
    });

    test('getAllShort should return a list of short student DTOs', async () => {
        const mockShortStudents = [
            { id: 1, name: 'Student 1' },
            { id: 2, name: 'Student 2' },
        ];

        StudentRepository.findAllShort = jest.fn().mockResolvedValue(mockShortStudents);

        const result = await studentService.getAllShort();

        expect(result).toEqual(mockShortStudents);
        expect(StudentRepository.findAllShort).toHaveBeenCalledTimes(1);
    });

    test('getStudentById should return a student by ID', async () => {
        const mockStudent = { id: 1, name: 'Student 1', email: 'student1@test.com' };

        StudentRepository.findById = jest.fn().mockResolvedValue(mockStudent);

        const result = await studentService.getStudentById(1);

        expect(result).toEqual(mockStudent);
        expect(StudentRepository.findById).toHaveBeenCalledWith(1);
    });

    test('createStudent should create a new student and return it', async () => {
        const studentInfo: StudentUpdateView = { name: 'Student 1', email: 'student1@test.com', password: 'password123', nationality: "aba", studyYear:2, passedCourses: [1, 2] };
        const mockHashedPassword = 'hashedPassword123';
        const mockCourses = [
            { id: 1, name: 'Course 1' },
            { id: 2, name: 'Course 2' },
        ];
        const mockStudent = { ...studentInfo, password: mockHashedPassword, passedCourses: mockCourses };

        bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
        CourseService.getCourseById = jest.fn().mockResolvedValue(mockCourses[0]);
        StudentRepository.create = jest.fn().mockResolvedValue(mockStudent);

        const result = await studentService.createStudent(studentInfo);

        expect(result).toEqual(mockStudent);
        expect(CourseService.getCourseById).toHaveBeenCalledWith(1);
        expect(CourseService.getCourseById).toHaveBeenCalledWith(2);
    });

    test('updateStudent should update an existing student and return it', async () => {
        const studentInfo: StudentUpdateView = { name: 'Student 1', email: 'student1@test.com', password: 'newPassword123', nationality: "aba", studyYear:2, passedCourses: [3] };
        const mockHashedPassword = 'newHashedPassword123';
        const mockCourse = { id: 3, name: 'Course 3' };
        const mockExistingStudent = { id: 1, name: 'Student 1', email: 'student1@test.com', password: 'oldPassword123', passedCourses: [{ id: 1, name: 'Course 1' }] };
        const mockUpdatedStudent = { ...studentInfo, password: mockHashedPassword, passedCourses: [mockCourse] };

        bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
        CourseService.getCourseById = jest.fn().mockResolvedValue(mockCourse);
        StudentRepository.findById = jest.fn().mockResolvedValue(mockExistingStudent);
        StudentRepository.update = jest.fn().mockResolvedValue(mockUpdatedStudent);
        StudentRepository.existsById = jest.fn().mockResolvedValue(true);

        const result = await studentService.updateStudent(1, studentInfo);

        expect(result).toEqual(mockUpdatedStudent);
        expect(CourseService.getCourseById).toHaveBeenCalledWith(3);
    });

    test('deleteStudentById should delete a student and return a success message', async () => {
        StudentRepository.existsById = jest.fn().mockResolvedValue(true);
        StudentRepository.deleteById = jest.fn().mockResolvedValue(undefined);
        ispService.deleteISPByStudentId = jest.fn().mockResolvedValue(undefined);

        const result = await studentService.deleteStudentById(1);

        expect(result).toBe('Student deleted successfully');
        expect(StudentRepository.existsById).toHaveBeenCalledWith(1);
        expect(StudentRepository.deleteById).toHaveBeenCalledWith(1);
        expect(ispService.deleteISPByStudentId).toHaveBeenCalledWith(1);
    });
});
