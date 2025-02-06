// administrative.ts
import { Privilege as PrismaPrivilege } from '@prisma/client';
import { PrismaAdministrative } from '../types/prismaTypesExtension';
import { Privilege } from './privilege';
import { User } from './user';

export class Administrative extends User {
    public readonly privileges: Privilege[];

    constructor(administrative: {
        id?: number;
        name: string;
        email: string;
        password: string;
        privileges: Privilege[];
    }) {
        super({
            id: administrative.id,
            name: administrative.name,
            email: administrative.email,
            password: administrative.password,
        });
        Administrative.validateAdministrative(administrative);
        this.privileges = administrative.privileges;
    }
    public static validateAdministrative(administrative: { privileges: Privilege[] }) {
        if (!administrative.privileges || administrative.privileges.length === 0) {
            throw new Error('Privileges are required for administrative users.');
        }
    }

    public equals(user: User): boolean {
        if (user instanceof Administrative) {
            return (
                super.equals(user) &&  // Calls equals from User class
                JSON.stringify(this.privileges) === JSON.stringify(user.privileges) // Compare privileges
            );
        }
        return false;
    }

    public static from({
        id,
        name,
        email,
        password,
        privileges,
    }: PrismaAdministrative & { privileges: PrismaPrivilege[] }): Administrative {
        return new Administrative({
            id,
            name,
            email,
            password,
            privileges: privileges.map(Privilege.from),
        });
    }
}
