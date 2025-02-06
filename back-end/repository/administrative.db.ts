import prismaClient from './prisma/prismaClient';
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { UserShort } from '../types/userDTO';
import { Administrative } from '../model/administrative';
import { Privilege } from '../model/privilege';

const findAll = tryCatchWrapper(async (): Promise<Administrative[]> => {
    const result = await prismaClient.user.findMany({
        where: {
            userType: 'Administrative',
        },
    });
    const privileges = await prismaClient.privilege.findMany({
        where: {
            administratives: {
                some: {
                    adminId: {
                        in: result.map((admin) => admin.id),
                    },
                },
            },
        },
    });
    return result.map((res) => Administrative.from({ ...res, privileges }));
});

const findAllShort = tryCatchWrapper(async (): Promise<UserShort[]> => {
    const result = await prismaClient.user.findMany({
        where: {
            userType: 'Administrative',
        },
        select: {
            id: true,
            name: true,
        },
    });
    return result;
});

const findById = tryCatchWrapper(async (id: number): Promise<Administrative> => {
    const admin = await prismaClient.user.findUnique({
        where: { id },
    });
    if (!admin) {
        throw new Error(ADMINISTRATIVE_NOT_FOUND_ERROR);
    }
    const privileges = await prismaClient.privilege.findMany({
        where: {
            administratives: {
                some: {
                    adminId: id,
                },
            },
        },
    });
    return Administrative.from({ ...admin, privileges });
});

const existsById = tryCatchWrapper(async (id: number): Promise<boolean> => {
    const existingAdmin = await prismaClient.user.findUnique({
        where: { id },
    });
    return !!existingAdmin;
});

const existsByEmail = tryCatchWrapper(async (email: string): Promise<boolean> => {
    const existingAdmin = await prismaClient.user.findUnique({
        where: { email },
    });
    return !!existingAdmin;
});

const create = tryCatchWrapper(async (adminInfo: Administrative): Promise<Administrative> => {
    const admin = await prismaClient.user.create({
        data: {
            name: adminInfo.name,
            email: adminInfo.email,
            password: adminInfo.password,
            userType: 'Administrative',
        },
    });

    if (adminInfo.privileges && adminInfo.privileges.length > 0) {
        for (const privilege of adminInfo.privileges) {
            if (!privilege.id) {
                throw new Error('Privilege id is required');
            }
            const existingPrivilege = await prismaClient.privilege.findUnique({
                where: { id: privilege.id },
            });
            if (!existingPrivilege) {
                throw new Error(ERROR_PRIVILEGE_NOT_EXIST(privilege.id));
            }
        }
    }

    const privileges = await prismaClient.privilege.findMany({
        where: {
            name: {
                in: adminInfo.privileges.map((privilege) => privilege.name),
            },
        },
    });

    // Assign privileges if any are provided
    if (adminInfo.privileges && adminInfo.privileges.length > 0) {
        await prismaClient.administrativePrivilege.createMany({
            data: privileges.map((privilege) => ({
                adminId: admin.id,
                privilegeId: privilege.id,
            })),
        });
    }

    return Administrative.from({ ...admin, privileges });
});

const update = tryCatchWrapper(
    async (id: number, adminInfo: Administrative): Promise<Administrative> => {
        const updatedAdmin = await prismaClient.user.update({
            where: { id },
            data: {
                name: adminInfo.name,
                email: adminInfo.email,
                password: adminInfo.password,
            },
        });
        await prismaClient.administrativePrivilege.deleteMany({
            where: {
                adminId: id,
            },
        });

        const privileges = await prismaClient.privilege.findMany({
            where: {
                name: {
                    in: adminInfo.privileges.map((privilege) => privilege.name),
                },
            },
        });

        await prismaClient.administrativePrivilege.createMany({
            data: privileges.map((privilege) => ({
                adminId: id,
                privilegeId: privilege.id,
            })),
        });

        return Administrative.from({ ...updatedAdmin, privileges });
    }
);

const deleteById = tryCatchWrapper(async (id: number): Promise<void> => {
    await prismaClient.administrativePrivilege.deleteMany({
        where: {
            adminId: id,
        },
    });

    await prismaClient.user.delete({
        where: { id },
    });
});

const ADMINISTRATIVE_NOT_FOUND_ERROR = 'Admin not found';
const ERROR_PRIVILEGE_NOT_EXIST = (id: number) => `Privilege with id ${id} does not exist`;

export default {
    findAll,
    findAllShort,
    findById,
    existsById,
    existsByEmail,
    create,
    update,
    deleteById,
};

export const errorMessages = {
    ADMINISTRATIVE_NOT_FOUND_ERROR,
    ERROR_PRIVILEGE_NOT_EXIST,
};
