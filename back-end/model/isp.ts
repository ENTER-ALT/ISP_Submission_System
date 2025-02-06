import { IspStatus } from "@prisma/client";
import { Course } from "./course";
import { Student } from "./student";
import { Isp as PrismaISP, Course as PrismaCourse } from "@prisma/client";
import { PrismaStudent } from "../types/prismaTypesExtension";

export class ISP {
    public readonly id?: number;
    public readonly status: IspStatus;
    public readonly totalCredits: number;
    public readonly startYear: number;
    public readonly courses: Course[];
    public readonly student: Student;

    constructor(isp: {
        id: number;
        status: IspStatus;
        totalCredits: number;
        startYear: number;
        courses: Course[];
        student: Student;
    }) {
        ISP.validateISP(isp);
        this.id = isp.id;
        this.status = isp.status;
        this.totalCredits = isp.totalCredits;
        this.startYear = isp.startYear;
        this.courses = isp.courses ||[];
        this.student = isp.student;
    }

    public static validateISP(isp: { status: IspStatus; totalCredits: number; startYear: number; student: Student;}) {
        if (!isp.status || isp.status.length=== 0){
            throw new Error("Description is required.")
        }
        if (!isp.totalCredits || isp.totalCredits <= 0) {
            throw new Error("Credits are required and cannot be negative")
        }
        if (!isp.startYear) {
            throw new Error("Start year is required.")
        }
        if(isp.startYear > 9999 || isp.startYear <1000){
            throw new Error("Start year should be 4 digit.")
        }
        if(!isp.student) {
            throw new Error("Student is required.")
        }
    }


    public equals(isp: ISP): boolean {
        return (
            this.id === isp.id &&
            this.status === isp.status &&
            this.totalCredits === isp.totalCredits &&
            this.startYear === isp.startYear &&
            this.courses.length === isp.courses.length &&
            this.courses.every((course, index) => course.equals(isp.courses[index]))
        );
    }

    public static fromIncludeAll({
        id,
        status,
        totalCredits,
        startYear,
        courses,
        student
    }: PrismaISP & { courses: PrismaCourse[], student: PrismaStudent}): ISP {
        return new ISP({
            id,
            status,
            totalCredits,
            startYear,
            courses: courses.map(Course.from),
            student: Student.from(student)
        });
    }

    public static from({
        id,
        status,
        totalCredits,
        startYear,
        student
    }: PrismaISP & { student: PrismaStudent }): ISP {
        return new ISP({
            id,
            status,
            totalCredits,
            startYear,
            courses: [],
            student: Student.from(student)
        });
    }
}
