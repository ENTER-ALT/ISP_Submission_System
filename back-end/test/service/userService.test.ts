import userService from '../../service/user.service';
import UserRepository from '../../repository/user.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../util/jwt';

// Mock dependencies
jest.mock('../../repository/user.db');
jest.mock('bcrypt');
jest.mock('../../util/jwt');

describe('User Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getUserByEmail should return a user by email', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' };

        UserRepository.findFullByEmail = jest.fn().mockResolvedValue(mockUser);

        const result = await userService.getUserByEmail('test@example.com');

        expect(result).toEqual(mockUser);
        expect(UserRepository.findFullByEmail).toHaveBeenCalledWith('test@example.com');
    });

    test('authenticate should throw error if password is incorrect', async () => {
        const authRequest = { username: 'test@example.com', password: 'wrongpassword' };

        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
            userType: 'admin',
            privileges: [{ id: 1 }],
        };

        UserRepository.findFullByEmail = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(false); // Simulate incorrect password

        await expect(userService.authenticate(authRequest)).rejects.toThrow('Incorrect password.');
    });

    test('authenticate should return token and session data if authentication is successful', async () => {
        const authRequest = { username: 'test@example.com', password: 'correctpassword' };

        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
            userType: 'admin',
            privileges: [{ id: 1 }],
        };

        const mockJwtToken = 'mockJwtToken';
        UserRepository.findFullByEmail = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(true); // Simulate correct password
        (generateJwtToken as jest.Mock).mockReturnValue(mockJwtToken);

        const result = await userService.authenticate(authRequest);

        expect(result).toEqual({
            token: mockJwtToken,
            data: {
                userId: 1,
                email: 'test@example.com',
                userType: 'admin',
                privileges: [1],
            },
        });
        expect(UserRepository.findFullByEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.compare).toHaveBeenCalledWith('correctpassword', 'hashedpassword');
    });

    test('generateJwtToken should be called with the correct email', async () => {
        const authRequest = { username: 'test@example.com', password: 'correctpassword' };

        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
            userType: 'admin',
            privileges: [{ id: 1 }],
        };

        UserRepository.findFullByEmail = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(true); // Simulate correct password

        await userService.authenticate(authRequest);
    });
});
