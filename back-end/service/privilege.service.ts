import { Privilege } from '../model/privilege';
import PrivilegeRepository from '../repository/privilege.db';

const getAllPrivileges = async (): Promise<Privilege[]> => {
    return await PrivilegeRepository.findAll();
};

const getPrivilegeById = async (id: number): Promise<Privilege> => {
    return await PrivilegeRepository.findById(id);
};

const privilegeService = {
    getAllPrivileges,
    getPrivilegeById,
};

export default privilegeService;
