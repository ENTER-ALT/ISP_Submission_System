import { Student } from '../../model/student';
import { Course } from '../../model/course';

const mockCourse = new Course({
    id: 1,
    name: 'Intro to Programming',
    description: 'Basic programming concepts',
    phase: 1,
    credits: 3,
    lecturers: ['Dr. Smith'],
    isElective: false,
    requiredPassedCourses: []
});

test('given: valid student data, when: student is created, then: user fields are set correctly', () => {
    const student = new Student({
        id: 2,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        nationality: 'American',
        studyYear: 1,
        passedCourses: [mockCourse]
    });

    expect(student.id).toEqual(2);
    expect(student.name).toEqual('Alice');
    expect(student.email).toEqual('alice@example.com');
    expect(student.password).toEqual('password123');
});

test('given: missing name, when: student is created, then: an error is thrown', () => {
    const createStudent = () => new Student({
        id: 3,
        name: '',
        email: 'bob@example.com',
        password: 'password123',
        nationality: 'Canadian',
        studyYear: 1,
        passedCourses: []
    });

    expect(createStudent).toThrow('Name is required.');
});

test('given: missing email, when: student is created, then: an error is thrown', () => {
    const createStudent = () => new Student({
        id: 4,
        name: 'Bob',
        email: '',
        password: 'password123',
        nationality: 'Canadian',
        studyYear: 1,
        passedCourses: []
    });

    expect(createStudent).toThrow('Email is required.');
});

test('given: missing password, when: student is created, then: an error is thrown', () => {
    const createStudent = () => new Student({
        id: 5,
        name: 'Bob',
        email: 'bob@example.com',
        password: '',
        nationality: 'Canadian',
        studyYear: 1,
        passedCourses: []
    });

    expect(createStudent).toThrow('Password is required.');
});

test('given: valid data, when: two students are created, then: equals method returns correct result', () => {
    const student1 = new Student({
        id: 7,
        name: 'Diana',
        email: 'diana@example.com',
        password: 'password123',
        nationality: 'Canadian',
        studyYear: 1,
        passedCourses: [mockCourse]
    });

    const student2 = new Student({
        id: 7,
        name: 'Diana',
        email: 'diana@example.com',
        password: 'password123',
        nationality: 'Canadian',
        studyYear: 1,
        passedCourses: [mockCourse]
    });

    expect(student1.equals(student2)).toBe(true);
});

test('given: different data, when: two students are compared, then: equals method returns false', () => {
    const student1 = new Student({
        id: 8,
        name: 'Eve',
        email: 'eve@example.com',
        password: 'password123',
        nationality: 'American',
        studyYear: 1,
        passedCourses: []
    });

    const student2 = new Student({
        id: 8,
        name: 'Evelyn',
        email: 'evelyn@example.com',
        password: 'differentpassword',
        nationality: 'Canadian',
        studyYear: 2,
        passedCourses: []
    });

    expect(student1.equals(student2)).toBe(false);
});
