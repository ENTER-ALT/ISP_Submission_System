import { IspStatus } from '@prisma/client';
import { UserShort } from './userDTO';

export class ISPShort {
    id: number;
    status: IspStatus;
    totalCredits: number;
    startYear: number;
    student: UserShort;

    constructor(id: number, status: IspStatus, totalCredits: number, startYear: number, student: UserShort) {
        this.id = id;
        this.status = status;
        this.totalCredits = totalCredits;
        this.startYear = startYear;
        this.student = student;
    }
}

export class UpdateISPView {
    totalCredits: number;
    startYear: number;
    studentId: number;
    status: IspStatus;
    courses: number[];

    constructor(totalCredits: number, startYear: number, studentId: number, status: IspStatus, courses: number[]) {
        this.totalCredits = totalCredits;
        this.startYear = startYear;
        this.studentId = studentId;
        this.status = status;
        this.courses = courses;
    }
}

export class UpdateByStudentISPView {
    status: IspStatus;
    courses: number[];

    constructor(status: IspStatus, courses: number[]) {
        this.status = status;
        this.courses = courses;
    }
}