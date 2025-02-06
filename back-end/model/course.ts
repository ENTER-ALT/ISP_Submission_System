import { Course as PrismaCourse } from '@prisma/client';

export class Course {
    public readonly id?: number;
    public readonly name: string;
    public readonly description: string;
    public readonly phase: number;
    public readonly credits: number;
    public readonly lecturers: string[];
    public readonly isElective: boolean;
    public readonly requiredPassedCourses: Course[];

    constructor(course: {
        id?: number;
        name: string;
        description: string;
        phase: number;
        credits: number;
        lecturers: string[];
        isElective: boolean;
        requiredPassedCourses: Course[];
    }) {
        Course.validate(course);
        this.id = course.id;
        this.name = course.name;
        this.description = course.description;
        this.phase = course.phase;
        this.credits = course.credits;
        this.lecturers = course.lecturers;
        this.isElective = course.isElective;
        this.requiredPassedCourses = course.requiredPassedCourses;
    }

    public static validate(course: {name: string; description: string; phase: number; credits: number; lecturers: string[]; isElective: boolean; requiredPassedCourses: Course[]}): void {
        if (!course.name || course.name.length === 0) {
            throw new Error("Name is required.");
        }
        if (!course.description || course.description.length === 0) {
            throw new Error("Description is required.");
        }
        if (!course.phase || course.phase < 0) {
            throw new Error("Phase is required.");
        }
        if (!course.credits || course.credits <= 0) {
            throw new Error("Credits are required and cannot be negative.");
        }
        if (course.isElective === null) {
            throw new Error("Course has to be an elective or non elective.");
        }
        if (course.requiredPassedCourses.includes(course as Course)) {
            throw new Error("Course cannot be a prerequisite of itself.");
        }
    }

    public set requiredCourse(course: Course) {
        if (this.requiredPassedCourses.includes(course)) {
            throw new Error("Course is already required");
        }
        this.requiredPassedCourses.push(course);
    }

    public equals(other: Course): boolean {
        return (
            this.id === other.id &&
            this.name === other.name &&
            this.phase === other.phase &&
            this.credits === other.credits &&
            this.isElective === other.isElective &&
            this.lecturers.every((lecturer, index) => lecturer === other.lecturers[index])
        );
    }

    public static fromWithRequiredCourses({
        id,
        name,
        description,
        phase,
        credits,
        lecturers,
        isElective,
        requiredPassedCourses,
    }: PrismaCourse & {requiredPassedCourses: PrismaCourse[]}): Course {

        return new Course({
            id,
            name,
            description,
            phase,
            credits,
            lecturers,
            isElective,
            requiredPassedCourses: requiredPassedCourses.map((course) => Course.from(course)),
        });
    }

    public static from({
        id,
        name,
        description,
        phase,
        credits,
        lecturers,
        isElective
    }: PrismaCourse): Course {

        return new Course({
            id,
            name,
            description,
            phase,
            credits,
            lecturers,
            isElective,
            requiredPassedCourses: [],
        });
    }
}
