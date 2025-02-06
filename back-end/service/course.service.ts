import { Course } from '../model/course';
import { ISP } from '../model/isp';
import CourseRepository from '../repository/course.db';
import StudentRepository from '../repository/student.db';
import ISPService from './isp.service';
import StudentService from './student.service';
import { Student } from '../model/student';
import { CourseUpdateView, CourseShortView } from '../types/coursesDTO';
import { StudentIncludeCourses } from '../types/studentDTO';

const getAll = async () : Promise<Course[]> => {
    return await CourseRepository.findAll();
}

const getAllShort = async () : Promise<CourseShortView[]> => {
    let result = await CourseRepository.findAllShort();
    return result;
}

const getCourseById = async (id: number): Promise<Course> => {
    return await CourseRepository.findById(id);
}

const getCoursesByIspId = async (ispId: number) : Promise<CourseShortView[]> => {
    await ISPService.throwErrorIfNotExist(ispId);
    let courses: Course[] = await CourseRepository.findAllByIspId(ispId);
    return courses;
}

const getCoursesForStudent = async (studentId: number) : Promise<CourseShortView[]> => {
    let student: StudentIncludeCourses = await StudentRepository.findById(studentId);
    let desiredPhases = [student.studyYear * 2 - 1, student.studyYear * 2];
    let passedCoursesIds = student.passedCourses.map(course => course.courseId);
    let courses: CourseShortView[] = await CourseRepository.findAllShortByPhaseAndPassedCourses(desiredPhases, passedCoursesIds);
    return courses;
}

const createCourse = async (courseInfo: CourseUpdateView) : Promise<Course> => {
    await throwErrorIfExist(courseInfo.name, courseInfo.phase);
    
    let requiredCourses: Course[] = [];
    for (const courseId of courseInfo.requiredPassedCourses) {
        let course: Course = await getCourseById(courseId);
        requiredCourses.push(course);
    }
    
    Course.validate({
        name: courseInfo.name,
        description: courseInfo.description,
        phase: courseInfo.phase,
        credits: courseInfo.credits,
        lecturers: courseInfo.lecturers,
        isElective: courseInfo.isElective,
        requiredPassedCourses: requiredCourses
    });
    
    return await CourseRepository.create(courseInfo);
}

const updateCourse = async (id: number, courseInfo: CourseUpdateView) : Promise<Course> => {
    let currentCourse = await getCourseById(id);

    let requiredCourses: Course[] = [];
    for (const courseId of courseInfo.requiredPassedCourses) {
        if (courseId === id) throw new Error("Course cannot require itself");
        let course: Course = await getCourseById(courseId);
        requiredCourses.push(course);
    }

    if (currentCourse.phase !== courseInfo.phase
        || currentCourse.credits !== courseInfo.credits) {
            let errorMessage = "Course's phase or credits cannot be changed, because it is chosen in ISP";
        await throwErrorIfChosenInIsp(id, errorMessage);
    }

    Course.validate({
        name: courseInfo.name,
        description: courseInfo.description,
        phase: courseInfo.phase,
        credits: courseInfo.credits,
        lecturers: courseInfo.lecturers,
        isElective: courseInfo.isElective,
        requiredPassedCourses: requiredCourses
    });
    
    return await CourseRepository.update(id, courseInfo);
}

const deleteCourses = async (ids: number[]) : Promise<String> => {
    for (const id of ids) {
        await throwErrorIfNotExist(id);
        await throwErrorIfChosenInIsp(id);
        await throwErrorIfPassedByStudent(id);
        await throwErrorIfRequiredByCourse(id);
    }
    await CourseRepository.deleteAllById(ids);
    return "Courses are successfully deleted";
}

const throwErrorIfNotExist = async (id: number) : Promise<void> => {
    let res: boolean = await CourseRepository.existsById(id);
    if (!res) {
        throw new Error(ERROR_COURSE_NOT_EXIST);
    }
}

const throwErrorIfExist = async (name: string, phase: number) : Promise<void> => {
    let res: boolean = await CourseRepository.existsByNameAndPhase(name, phase);
    if (res) {
        throw new Error(ERROR_COURSE_EXIST(name, phase));
    }
}

const throwErrorIfChosenInIsp = async (id: number, errorMessage?: string) : Promise<void> => {
    let res: ISP[] = await ISPService.getAllByCourseId(id);
    if (res.length > 0) {
        throw new Error(errorMessage || ERROR_COURSE_CHOSEN_IN_ISP);
    }
}

const throwErrorIfPassedByStudent = async (id: number) : Promise<void> => {
    let res: Student[] = await StudentService.getAllByPassedCourseId(id);
    if (res.length > 0) {
        throw new Error(ERROR_COURSE_PASSED_BY_STUDENT);
    }
}

const throwErrorIfRequiredByCourse = async (id: number) : Promise<void> => {
    let res: boolean = await CourseRepository.isRequiredByAnotherCourse(id);
    if (res) {
        throw new Error(ERROR_COURSE_REQUIRED_BY_COURSE);
    }
}

const ERROR_COURSE_NOT_EXIST =`This course does not exist`;
const ERROR_COURSE_EXIST = (name: string, phase: number) => `Course with name ${name} and semester ${phase} already exists`;
const ERROR_COURSE_CHOSEN_IN_ISP = `This course is chosen in ISP`;
const ERROR_COURSE_PASSED_BY_STUDENT = `This course is passed by student`;
const ERROR_COURSE_REQUIRED_BY_COURSE = `This course is required by course`;
const ERROR_COURSE_REQUIRE_ITSELF = "Course cannot require itself";
const ERROR_COURSE_PHASE_CREDITS_CHANGE = "Course's phase or credits cannot be changed, because it is chosen in ISP";

export default {
    getAll,
    getAllShort,
    getCourseById,
    getCoursesByIspId,
    getCoursesForStudent,
    createCourse,
    updateCourse,
    deleteCourses,
};

export const errorMessages = {
    ERROR_COURSE_NOT_EXIST,
    ERROR_COURSE_EXIST,
    ERROR_COURSE_CHOSEN_IN_ISP,
    ERROR_COURSE_PASSED_BY_STUDENT,
    ERROR_COURSE_REQUIRED_BY_COURSE,
    ERROR_COURSE_REQUIRE_ITSELF,
    ERROR_COURSE_PHASE_CREDITS_CHANGE
};
