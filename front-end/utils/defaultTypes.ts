import { Administrative, Course, ISP, ISPStatus, Privilege, Student } from "../types";
import { UserType } from "../types/auth";

const currentYear = new Date().getFullYear();

export const getDefaultISP = (): ISP => ({
    id: -1,
    status: ISPStatus.NOTSUBMITTED,
    totalCredits: 60,
    startYear: currentYear,
    courses: [],
    student: { id: -1, name: '' }
});

export const getDefaultStudent = (): Student => ({
    id: -1,
    name: '',
    email: '',
    password: '',
    nationality: '',
    userType: UserType.STUDENT,
    passedCourses: [],
    studyYear: 1
});

export const getDefaultAdmin = (): Administrative => ({
    id: -1,
    name: '',
    email: '',
    password: '',
    userType: UserType.ADMINISTRATIVE,
    privileges: []
});

export const getDefaultPrivilege = (): Privilege => ({
    id: -1,
    name: -1,
    description: ''
});

export const getDefaultCourse = (): Course => ({
    id: -1,
    name: '',
    description: '',
    phase: 1,
    credits: 0,
    lecturers: [],
    isElective: false,
    requiredPassedCourses: []
});