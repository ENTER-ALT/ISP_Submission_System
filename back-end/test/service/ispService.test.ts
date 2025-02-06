import ISPRepository from '../../repository/isp.db';
import CourseService from '../../service/course.service';
import ispService from '../../service/isp.service';
import studentService from '../../service/student.service';
import { UpdateISPView } from '../../types/ispDTO';

// Mock dependencies
jest.mock('../../repository/isp.db');
jest.mock('../../service/course.service');
jest.mock('../../service/student.service');

describe('ISP Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAll should return a list of ISPs', async () => {
        const mockISPs = [
            { id: 1, studentId: 101, startYear: 2022, totalCredits: 30 },
            { id: 2, studentId: 102, startYear: 2023, totalCredits: 40 },
        ];

        ISPRepository.findAll = jest.fn().mockResolvedValue(mockISPs);

        const result = await ispService.getAll();

        expect(result).toEqual(mockISPs);
        expect(ISPRepository.findAll).toHaveBeenCalledTimes(1);
    });

    test('getISPById should return ISP by ID', async () => {
        const mockISP = { id: 1, studentId: 101, startYear: 2022, totalCredits: 30 };

        ISPRepository.findById = jest.fn().mockResolvedValue(mockISP);

        const result = await ispService.getISPById(1);

        expect(result).toEqual(mockISP);
        expect(ISPRepository.findById).toHaveBeenCalledWith(1);
    });

    test('createISP should create a new ISP', async () => {
        const ispInfo: UpdateISPView = {
            studentId: 101,
            startYear: 2022,
            totalCredits: 30,
            courses: [1, 2],
            status: 'NOTSUBMITTED',
        };

        const mockCourse = { id: 1, name: 'Course 1' };
        const mockStudent = { id: 101, name: 'John Doe' };

        CourseService.getCourseById = jest.fn().mockResolvedValue(mockCourse);
        studentService.getStudentById = jest.fn().mockResolvedValue(mockStudent);
        ISPRepository.create = jest.fn().mockResolvedValue(ispInfo);

        const result = await ispService.createISP(ispInfo);

        expect(result).toEqual(ispInfo);
        expect(CourseService.getCourseById).toHaveBeenCalledTimes(2); // For both courses
        expect(studentService.getStudentById).toHaveBeenCalledWith(101);
        expect(ISPRepository.create).toHaveBeenCalledWith(ispInfo);
    });

    test('updateISP should update an existing ISP', async () => {
        const ispInfo: UpdateISPView = {
            studentId: 101,
            startYear: 2022,
            totalCredits: 40,
            courses: [1, 3],
            status: 'NOTSUBMITTED',
        };

        const mockISP = { id: 1, student: { id: 101 }, startYear: 2022, totalCredits: 30 };
        const mockCourse = { id: 3, name: 'Course 3' };
        const mockStudent = { id: 101, name: 'John Doe' };

        ISPRepository.findById = jest.fn().mockResolvedValue(mockISP);
        CourseService.getCourseById = jest.fn().mockResolvedValue(mockCourse);
        studentService.getStudentById = jest.fn().mockResolvedValue(mockStudent);
        ISPRepository.update = jest.fn().mockResolvedValue(ispInfo);
        ISPRepository.existsById = jest.fn().mockResolvedValue(true);

        const result = await ispService.updateISP(1, ispInfo);

        expect(result).toEqual(ispInfo);
        expect(CourseService.getCourseById).toHaveBeenCalledTimes(2); // For both courses
        expect(studentService.getStudentById).toHaveBeenCalledWith(101);
        expect(ISPRepository.update).toHaveBeenCalledWith(1, ispInfo);
    });

    test('deleteISPById should delete an ISP by ID', async () => {
        ISPRepository.deleteById = jest.fn().mockResolvedValue(null);
        ISPRepository.existsById = jest.fn().mockResolvedValue(true);

        const result = await ispService.deleteISPById(1);

        expect(result).toBe('ISP deleted successfully');
        expect(ISPRepository.deleteById).toHaveBeenCalledWith(1);
    });

    test('deleteISPByStudentId should delete an ISP by student ID', async () => {
        ISPRepository.deleteByStudentId = jest.fn().mockResolvedValue(null);
        ISPRepository.existsById = jest.fn().mockResolvedValue(true);

        const result = await ispService.deleteISPByStudentId(101);

        expect(result).toBe('ISP deleted successfully');
        expect(ISPRepository.deleteByStudentId).toHaveBeenCalledWith(101);
    });
});
