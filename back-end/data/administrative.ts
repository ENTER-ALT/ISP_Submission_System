import { Administrative } from '../model/administrative';
import privileges from './privilege';

const admins: Administrative[] = [
    new Administrative({
        id: 1,
        name: 'Zeus',
        email: 'zeus@example.com',
        password: 'password123',
        privileges: [privileges[0], privileges[1], privileges[2]],
    }),
    new Administrative({
        id: 2,
        name: 'Hera',
        email: 'hera@example.com',
        password: 'password123',
        privileges: [privileges[3], privileges[4], privileges[5]],
    }),
    new Administrative({
        id: 3,
        name: 'Poseidon',
        email: 'poseidon@example.com',
        password: 'password123',
        privileges: [privileges[6], privileges[7], privileges[8]],
    }),
    new Administrative({
        id: 4,
        name: 'Demeter',
        email: 'demeter@example.com',
        password: 'password123',
        privileges: [privileges[9], privileges[10], privileges[11]],
    }),
    new Administrative({
        id: 5,
        name: 'Athena',
        email: 'athena@example.com',
        password: 'password123',
        privileges: privileges,
    }),
];

export default admins;
