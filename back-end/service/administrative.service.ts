import { Administrative } from '../model/administrative';
import { Privilege } from '../model/privilege';
import AdministrativeRepository from '../repository/administrative.db';
import bcrypt from 'bcrypt';
import { UserShort } from '../types/userDTO';
import privilegeService from './privilege.service';

const getAllAdministratives = async (): Promise<Administrative[]> => {
    return await AdministrativeRepository.findAll();
};

const getAllShortAdministratives = async (): Promise<UserShort[]> => {
    return await AdministrativeRepository.findAllShort();
};

const getAdministrativeById = async (id: number): Promise<Administrative> => {
    return await AdministrativeRepository.findById(id);
};

const createAdministrative = async (adminInfo: Administrative): Promise<Administrative> => {
    await throwErrorIfExistsByEmail(adminInfo.email);

    const hashedPassword = await bcrypt.hash(adminInfo.password, 12);

    let privileges: Privilege[] = [];
    for (const pr of adminInfo.privileges) {
        if (pr.id === undefined) {
            throw new Error('Privilege id is required');
        }
        const privilege: Privilege = await privilegeService.getPrivilegeById(pr.id);
        privileges.push(privilege);
    }

    Administrative.validateAdministrative({
        privileges: privileges,
    });

    adminInfo = new Administrative({
        id: adminInfo.id,
        name: adminInfo.name,
        email: adminInfo.email,
        password: hashedPassword,
        privileges,
    });

    return await AdministrativeRepository.create(adminInfo);
};

const updateAdministrative = async (id: number, adminInfo: Administrative): Promise<Administrative> => {
    await throwErrorIfNotExist(id);

    const existingAdmin: Administrative = await getAdministrativeById(id);
    const hashedPassword = adminInfo.password ? await bcrypt.hash(adminInfo.password, 12) : existingAdmin.password;

    let privileges: Privilege[] = [];
    for (const pr of adminInfo.privileges) {
        if (pr.id === undefined) {
            throw new Error('Privilege id is required');
        }
        const privilege: Privilege = await privilegeService.getPrivilegeById(pr.id);
        privileges.push(privilege);
    }

    Administrative.validateAdministrative({
        privileges: privileges || existingAdmin.privileges,
    });

    adminInfo = new Administrative({
        id: adminInfo.id,
        name: adminInfo.name,
        email: adminInfo.email,
        password: hashedPassword,
        privileges,
    });

    return await AdministrativeRepository.update(id, adminInfo);
};

const deleteAdministrativeById = async (id: number): Promise<string> => {
    await throwErrorIfNotExist(id);
    await AdministrativeRepository.deleteById(id);
    return 'Administrative deleted successfully';
};

const throwErrorIfNotExist = async (id: number): Promise<void> => {
    const exists: boolean = await AdministrativeRepository.existsById(id);
    if (!exists) {
        throw new Error(ERROR_ADMIN_NOT_EXIST);
    }
};

const throwErrorIfExistsByEmail = async (email: string): Promise<void> => {
    const exists: boolean = await AdministrativeRepository.existsByEmail(email);
    if (exists) {
        throw new Error(ERROR_ADMIN_EXISTS(email));
    }
};

const ERROR_ADMIN_NOT_EXIST = 'The administrative does not exist';
const ERROR_ADMIN_EXISTS = (email: string) => `An administrative with email ${email} already exists`;

export default {
    getAllAdministratives,
    getAllShortAdministratives,
    getAdministrativeById,
    createAdministrative,
    updateAdministrative,
    deleteAdministrativeById,
};

export const errorMessages = {
    ERROR_ADMIN_NOT_EXIST,
    ERROR_ADMIN_EXISTS,
};
