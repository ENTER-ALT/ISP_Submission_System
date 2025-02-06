export class StudentIncludeCourses {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public nationality: string;
    public studyYear: number;
    public passedCourses: { courseId: number }[];

    constructor(student: {
        id: number;
        name: string;
        email: string;
        password: string;
        nationality: string | null;
        studyYear: number | null;
        passedCourses: { courseId: number }[];
    }) {
        this.id = student.id;
        this.name = student.name;
        this.email = student.email;
        this.password = student.password;
        this.nationality = student.nationality || '';
        this.studyYear = student.studyYear || 0;
        this.passedCourses = student.passedCourses;
    }
}


export class StudentUpdateView {
    public name: string;
    public email: string;
    public password: string;
    public nationality?: string;
    public studyYear: number;
    public passedCourses: number[];

    constructor(student: StudentUpdateView) {
        this.name = student.name;
        this.email = student.email;
        this.password = student.password;
        this.nationality = student.nationality;
        this.studyYear = student.studyYear;
        this.passedCourses = student.passedCourses;
    }
}