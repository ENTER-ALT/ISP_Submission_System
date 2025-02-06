import { Course as PrismaCourse } from '@prisma/client';
import { PrismaStudent } from '../types/prismaTypesExtension';
import { Course } from './course';
import { User } from './user';
export class Student extends User {
    public readonly nationality: string;
    public readonly studyYear: number;
    public readonly passedCourses: Course[];

    constructor(student: {
        id: number;
        name: string;
        email: string;
        password: string;
        nationality: string | null;
        studyYear: number | null;
        passedCourses: Course[];
    }) {
        super({
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
        });
        Student.validateStudent(student);
        this.nationality = student.nationality || '';
        this.studyYear = student.studyYear || 0;
        this.passedCourses = student.passedCourses || [];
    }

    public static validateStudent(student: {
        name: string;
        email: string;
        password: string;
        nationality: string | null;
        studyYear: number | null;
        passedCourses: Course[];
    }): void {
        if (!student.name || student.name.trim() === '') {
            throw new Error('Name is required.');
        }

        if (!student.email || student.email.trim() === '') {
            throw new Error('Email is required.');
        }

        if (!student.password || student.password.trim() === '') {
            throw new Error('Password is required.');
        }
    }

    equals(student: Student): boolean {
        return (
            this.id === student.id &&
            this.name === student.name &&
            this.email === student.email &&
            this.password === student.password &&
            this.nationality === student.nationality &&
            this.passedCourses.every((passedCourse, index) =>
                passedCourse.equals(student.passedCourses[index])
            )
        );
    }

    public static fromIncludeAll({
        id,
        name,
        email,
        password,
        nationality,
        studyYear,
        passedCourses,
    }: PrismaStudent & { passedCourses: PrismaCourse[] }): Student {
        return new Student({
            id,
            name,
            email,
            password,
            nationality,
            studyYear,
            passedCourses: passedCourses.map(Course.from),
        });
    }

    public static from({ id, name, email, password, nationality, studyYear }: PrismaStudent): Student {
        return new Student({
            id,
            name,
            email,
            password,
            nationality,
            studyYear,
            passedCourses: [],
        });
    }
}
