import { Student } from '../model/student';
import courses from './courses';
import { nationalities } from '../util/nationalities';

let students: Student[] = [
    new Student({
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
        nationality: nationalities[3], // American
        passedCourses: [],
        studyYear: 1,
    }),
    new Student({
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'password123',
        nationality: nationalities[25], // British
        passedCourses: [],
        studyYear: 2,
    }),
    new Student({
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'password123',
        nationality: nationalities[34], // Canadian
        passedCourses: [],
        studyYear: 3,
    }),
    new Student({
        id: 4,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        password: 'password123',
        nationality: nationalities[9], // Australian
        passedCourses: [],
        studyYear: 4,
    }),
    new Student({
        id: 5,
        name: 'Ethan Hunt',
        email: 'ethan.hunt@example.com',
        password: 'password123',
        nationality: nationalities[122], // New Zealander
        passedCourses: [],
        studyYear: 5,
    }),
    new Student({
        id: 6,
        name: 'Frank Castle',
        email: 'frank.castle@example.com',
        password: 'password123',
        nationality: nationalities[1], // American
        passedCourses: [],
        studyYear: 2,
    }),
    new Student({
        id: 7,
        name: 'Grace Lee',
        email: 'grace.lee@example.com',
        password: 'password123',
        nationality: nationalities[8], // South Korean
        passedCourses: [],
        studyYear: 3,
    }),
    new Student({
        id: 8,
        name: 'Harry Potter',
        email: 'harry.potter@example.com',
        password: 'password123',
        nationality: nationalities[25], // British
        passedCourses: [],
        studyYear: 2,
    }),
    new Student({
        id: 9,
        name: 'Isla Fisher',
        email: 'isla.fisher@example.com',
        password: 'password123',
        nationality: nationalities[2], // Australian
        passedCourses: [],
        studyYear: 4,
    }),
    new Student({
        id: 10,
        name: 'Jack Daniels',
        email: 'jack.daniels@example.com',
        password: 'password123',
        nationality: nationalities[6], // French
        passedCourses: [],
        studyYear: 5,
    }),
    new Student({
        id: 11,
        name: 'Lena Dunham',
        email: 'lena.dunham@example.com',
        password: 'password123',
        nationality: nationalities[7], // German
        passedCourses: [],
        studyYear: 4,
    }),
    new Student({
        id: 12,
        name: 'Michael Jordan',
        email: 'michael.jordan@example.com',
        password: 'password123',
        nationality: nationalities[3], // American
        passedCourses: [],
        studyYear: 1,
    }),
    new Student({
        id: 13,
        name: 'Nina Simone',
        email: 'nina.simone@example.com',
        password: 'password123',
        nationality: nationalities[0], // South African
        passedCourses: [],
        studyYear: 3,
    }),
    new Student({
        id: 14,
        name: 'Oscar Wilde',
        email: 'oscar.wilde@example.com',
        password: 'password123',
        nationality: nationalities[25], // British
        passedCourses: [],
        studyYear: 4,
    }),
    new Student({
        id: 15,
        name: 'Paul Rudd',
        email: 'paul.rudd@example.com',
        password: 'password123',
        nationality: nationalities[3], // American
        passedCourses: [],
        studyYear: 2,
    }),
    new Student({
        id: 16,
        name: 'Quinn Sullivan',
        email: 'quinn.sullivan@example.com',
        password: 'password123',
        nationality: nationalities[12], // Irish
        passedCourses: [],
        studyYear: 5,
    }),
    new Student({
        id: 17,
        name: 'Rachel Green',
        email: 'rachel.green@example.com',
        password: 'password123',
        nationality: nationalities[6], // French
        passedCourses: [],
        studyYear: 4,
    }),
    new Student({
        id: 18,
        name: 'Sammy Davis Jr.',
        email: 'sammy.davis@example.com',
        password: 'password123',
        nationality: nationalities[4], // Japanese
        passedCourses: [],
        studyYear: 5,
    }),
    new Student({
        id: 19,
        name: 'Tessa Thompson',
        email: 'tessa.thompson@example.com',
        password: 'password123',
        nationality: nationalities[0], // South African
        passedCourses: [],
        studyYear: 6,
    }),
    new Student({
        id: 20,
        name: 'Uma Thurman',
        email: 'uma.thurman@example.com',
        password: 'password123',
        nationality: nationalities[5], // Canadian
        passedCourses: [],
        studyYear: 6,
    }),
    new Student({
        id: 21,
        name: 'Vince Vaughn',
        email: 'vince.vaughn@example.com',
        password: 'password123',
        nationality: nationalities[10], // Mexican
        passedCourses: [],
        studyYear: 2,
    }),
    new Student({
        id: 22,
        name: 'Wendy Williams',
        email: 'wendy.williams@example.com',
        password: 'password123',
        nationality: nationalities[11], // Italian
        passedCourses: [],
        studyYear: 3,
    }),
    new Student({
        id: 23,
        name: 'Xander Cage',
        email: 'xander.cage@example.com',
        password: 'password123',
        nationality: nationalities[9], // Australian
        passedCourses: [],
        studyYear: 4,
    }),
    new Student({
        id: 24,
        name: 'Yara Shahidi',
        email: 'yara.shahidi@example.com',
        password: 'password123',
        nationality: nationalities[8], // South Korean
        passedCourses: [],
        studyYear: 5,
    }),
    new Student({
        id: 25,
        name: 'Zoe Saldana',
        email: 'zoe.saldana@example.com',
        password: 'password123',
        nationality: nationalities[16], // Spanish
        passedCourses: [],
        studyYear: 6,
    }),
    new Student({
        id: 26,
        name: 'Adam Driver',
        email: 'adam.driver@example.com',
        password: 'password123',
        nationality: nationalities[3], // American
        passedCourses: [courses[21]],
        studyYear: 6,
    }),
    new Student({
        id: 27,
        name: 'Brie Larson',
        email: 'brie.larson@example.com',
        password: 'password123',
        nationality: nationalities[7], // German
        passedCourses: [courses[22]],
        studyYear: 5,
    }),
    new Student({
        id: 28,
        name: 'Chris Hemsworth',
        email: 'chris.hemsworth@example.com',
        password: 'password123',
        nationality: nationalities[6], // French
        passedCourses: [courses[23]],
        studyYear: 3,
    }),
    new Student({
        id: 29,
        name: 'Dwayne Johnson',
        email: 'dwayne.johnson@example.com',
        password: 'password123',
        nationality: nationalities[4], // Japanese
        passedCourses: [courses[24]],
        studyYear: 6,
    }),
    new Student({
        id: 30,
        name: 'Emma Watson',
        email: 'emma.watson@example.com',
        password: 'password123',
        nationality: nationalities[25], // British
        passedCourses: [courses[25]],
        studyYear: 6,
    })
];

export default students;
