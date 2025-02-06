import administrativeService from '../../service/administrative.service';
import AdministrativeRepository from '../../repository/administrative.db';
import privilegeService from '../../service/privilege.service';
import bcrypt from 'bcrypt';
import { Administrative } from '../../model/administrative';
import { Privilege } from '../../model/privilege';
import { PrivilegeType } from '../../types/privilegeDTO';

// Mock dependencies
jest.mock('../../repository/administrative.db');
jest.mock('../../service/privilege.service');
jest.mock('bcrypt');

describe('Administrative Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllAdministratives should return a list of administratives', async () => {
        const mockAdministratives = [
            { id: 1, name: 'Admin 1', email: 'admin1@test.com' },
            { id: 2, name: 'Admin 2', email: 'admin2@test.com' },
        ];

        // Mock the repository method
        AdministrativeRepository.findAll = jest.fn().mockResolvedValue(mockAdministratives);

        const result = await administrativeService.getAllAdministratives();

        expect(result).toEqual(mockAdministratives);
        expect(AdministrativeRepository.findAll).toHaveBeenCalledTimes(1);
    });

    test('getAllShortAdministratives should return a list of user short DTOs', async () => {
        const mockShortAdministratives = [
            { id: 1, name: 'Admin 1' },
            { id: 2, name: 'Admin 2' },
        ];

        // Mock the repository method
        AdministrativeRepository.findAllShort = jest.fn().mockResolvedValue(mockShortAdministratives);

        const result = await administrativeService.getAllShortAdministratives();

        expect(result).toEqual(mockShortAdministratives);
        expect(AdministrativeRepository.findAllShort).toHaveBeenCalledTimes(1);
    });

    test('getAdministrativeById should return an administrative object', async () => {
        const mockAdministrative = { id: 1, name: 'Admin 1', email: 'admin1@test.com' };

        // Mock the repository method
        AdministrativeRepository.findById = jest.fn().mockResolvedValue(mockAdministrative);

        const result = await administrativeService.getAdministrativeById(1);

        expect(result).toEqual(mockAdministrative);
        expect(AdministrativeRepository.findById).toHaveBeenCalledWith(1);
    });

    test('createAdministrative should create a new administrative and return it', async () => {
        const adminInfo = new Administrative({ id: 1, name: 'Admin 1', email: 'admin1@test.com', password: 'password123', privileges: [ new Privilege ({ id: 2, name: PrivilegeType.CREATE_ADMINISTRATIVE, description:"blya"})] });
        const mockHashedPassword = 'hashedPassword123';
        const mockPrivilege = { id: 1, name: 'Admin Privilege' };
        const mockAdministrative = { ...adminInfo, password: mockHashedPassword, privileges: [mockPrivilege] };

        // Mock bcrypt and privilege service
        bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
        AdministrativeRepository.create = jest.fn().mockResolvedValue(mockAdministrative);

        const result = await administrativeService.createAdministrative(adminInfo);

        expect(result).toEqual(mockAdministrative);
        expect(bcrypt.hash).toHaveBeenCalledWith(adminInfo.password, 12);
    });

    test('updateAdministrative should update an existing administrative and return it', async () => {
        const adminInfo = new Administrative({ id: 1, name: 'Admin 1', email: 'admin1@test.com', password: 'newPassword123', privileges: [ new Privilege ({ id:2 ,name: PrivilegeType.CREATE_ADMINISTRATIVE, description:"blya"})] });
        const mockHashedPassword = 'newHashedPassword123';
        const mockPrivilege = { id: 2, name: 'Updated Privilege' };
        const mockAdministrative = { ...adminInfo, password: mockHashedPassword, privileges: [mockPrivilege] };

        // Mock bcrypt, privilege service, and repository methods
        bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
        privilegeService.getPrivilegeById = jest.fn().mockResolvedValue(mockPrivilege);
        AdministrativeRepository.findById = jest.fn().mockResolvedValue(mockAdministrative);
        AdministrativeRepository.update = jest.fn().mockResolvedValue(mockAdministrative);
        AdministrativeRepository.existsById = jest.fn().mockResolvedValue(true);

        const result = await administrativeService.updateAdministrative(1, adminInfo);

        expect(result).toEqual(mockAdministrative);
        expect(bcrypt.hash).toHaveBeenCalledWith(adminInfo.password, 12);
        expect(privilegeService.getPrivilegeById).toHaveBeenCalledWith(2);
        expect(AdministrativeRepository.update).toHaveBeenCalledWith(1, expect.objectContaining({
            ...adminInfo,
            password: mockHashedPassword,
            privileges: [mockPrivilege],
        }));
    });

    test('deleteAdministrativeById should delete an administrative and return a success message', async () => {
        // Mock the repository method
        AdministrativeRepository.existsById = jest.fn().mockResolvedValue(true);
        AdministrativeRepository.deleteById = jest.fn().mockResolvedValue(undefined);

        const result = await administrativeService.deleteAdministrativeById(1);

        expect(result).toBe('Administrative deleted successfully');
        expect(AdministrativeRepository.existsById).toHaveBeenCalledWith(1);
        expect(AdministrativeRepository.deleteById).toHaveBeenCalledWith(1);
    });
});
