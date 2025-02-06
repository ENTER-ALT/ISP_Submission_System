import privilegeService from '../../service/privilege.service';
import PrivilegeRepository from '../../repository/privilege.db';

jest.mock('../../repository/privilege.db');

describe('Privilege Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllPrivileges should return a list of privileges', async () => {
        const mockPrivileges = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'User' },
        ];

        PrivilegeRepository.findAll = jest.fn().mockResolvedValue(mockPrivileges);

        const result = await privilegeService.getAllPrivileges();

        expect(result).toEqual(mockPrivileges);
        expect(PrivilegeRepository.findAll).toHaveBeenCalledTimes(1);
    });

    test('getPrivilegeById should return a privilege by ID', async () => {
        const mockPrivilege = { id: 1, name: 'Admin' };

        PrivilegeRepository.findById = jest.fn().mockResolvedValue(mockPrivilege);

        const result = await privilegeService.getPrivilegeById(1);

        expect(result).toEqual(mockPrivilege);
        expect(PrivilegeRepository.findById).toHaveBeenCalledWith(1);
    });
});
