import prismaClient from './prisma/prismaClient';
import { tryCatchWrapper } from '../util/tryCatchWrapper';
import { Privilege } from '../model/privilege';

const findAll = tryCatchWrapper(async (): Promise<Privilege[]> => {
    const privileges = await prismaClient.privilege.findMany({
    });
    return privileges.map(Privilege.from);
});

const findById = tryCatchWrapper(async (id: number): Promise<Privilege> => {
    const privilege = await prismaClient.privilege.findUnique({
        where: { id },
    });
    if (!privilege) {
        throw new Error(ERROR_PRIVILEGE_NOT_EXIST(id));
    }
    return Privilege.from(privilege);
});

const ERROR_PRIVILEGE_NOT_EXIST = (id: number) => `Privilege with id ${id} does not exist`;

export default {
    findAll,
    findById,
};
