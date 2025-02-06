import { CourseShortView, CourseUpdateView } from "../../types/coursesDTO";
import courseService from "../../service/course.service";
import courseRepository from "../../repository/course.db";
import studentService from "../../service/student.service";
import ispService from "../../service/isp.service";
import dummyCourses from "../../data/courses";
import {errorMessages} from "../../service/course.service";
import { Course } from "../../model/course";

describe('Course Service', () => {

describe('CourseService', () => {

    beforeEach(() => {
    
        courseRepository.findAll = jest.fn();
        courseRepository.findById = jest.fn();
        courseRepository.findAllShort = jest.fn();
        courseRepository.create = jest.fn();
        courseRepository.update = jest.fn();
        courseRepository.deleteAllById = jest.fn();
        courseRepository.isRequiredByAnotherCourse = jest.fn();
        courseRepository.findAllShortByPhaseAndPassedCourses = jest.fn();
        courseRepository.existsById = jest.fn();
        courseRepository.existsByNameAndPhase = jest.fn();
        
        studentService.getAllByPassedCourseId = jest.fn();
        ispService.getAllByCourseId = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getAll', () => {
      it('should return a list of courses', async () => {
        const mockCourses = [{ id: 1, name: 'Course 1' }, { id: 2, name: 'Course 2' }];
        (courseRepository.findAll as jest.Mock).mockReturnValue(mockCourses);
  
        const result = await courseService.getAll();
  
        expect(courseRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockCourses);
      });
    });
  
    describe('getAllShort', () => {
      it('should return short course details', async () => {
        const mockCourses = [{ id: 1, name: 'Course 1', phase: 1, credits: 5 }];
        (courseRepository.findAllShort as jest.Mock).mockReturnValue(mockCourses);
  
        const result = await courseService.getAllShort();
  
        expect(courseRepository.findAllShort).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockCourses);
      });
    });
  
    describe('getCourseById', () => {
      it('should return a course by ID', async () => {
        const mockCourse = { id: 1, name: 'Course 1' };
        (courseRepository.findById as jest.Mock).mockReturnValue(mockCourse);
  
        const result = await courseService.getCourseById(1);
  
        expect(courseRepository.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockCourse);
      });
    });
  
    describe('createCourse', () => {
      it('should create a new course', async () => {
        const courseInfo = {
          name: 'Course 1',
          description: 'Course description',
          phase: 1,
          credits: 5,
          lecturers: ['Lecturer A'],
          isElective: false,
          requiredPassedCourses: [1],
        };
        const mockCreatedCourse = { id: 1, name: 'Course 1', phase: 1 };
        (courseRepository.existsByNameAndPhase as jest.Mock).mockReturnValue(false);
        (courseRepository.create as jest.Mock).mockReturnValue(mockCreatedCourse);
  
        const result = await courseService.createCourse(courseInfo);
  
        expect(courseRepository.existsByNameAndPhase).toHaveBeenCalledWith(courseInfo.name, courseInfo.phase);
        expect(courseRepository.create).toHaveBeenCalledWith(courseInfo);
        expect(result).toEqual(mockCreatedCourse);
      });
  
      it('should throw error if course already exists', async () => {
        const courseInfo: CourseUpdateView = {
            name: 'Course 1',
            description: 'Updated description',
            phase: 1,
            credits: 5,
            lecturers: ['Lecturer B'],
            isElective: true,
            requiredPassedCourses: [1],
        };
        (courseRepository.existsByNameAndPhase as jest.Mock).mockReturnValue(true);
  
        await expect(courseService.createCourse(courseInfo)).rejects.toThrow('Course with name Course 1 and semester 1 already exists');
      });
    });
  });
});