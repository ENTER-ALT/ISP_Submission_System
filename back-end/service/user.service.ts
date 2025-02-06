import UserRepository from '../repository/user.db';
import {
    AuthenticationRequest,
    AuthenticationResponse,
    FullUser,
    SessionData,
} from '../types/userDTO';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

const getUserByEmail = async (email: string): Promise<FullUser> => {
    return await UserRepository.findFullByEmail(email);
};

const authenticate = async ({
    username: email,
    password,
}: AuthenticationRequest): Promise<AuthenticationResponse> => {
    const user: FullUser = await UserRepository.findFullByEmail(email);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }

    const data: SessionData = {
        userId: user.id,
        email: user.email,
        userType: user.userType,
        privileges: user.privileges.map((pr) => pr.id),
    };
    const token = generateJwtToken(email, user.userType);

    return {
        token,
        data,
    };
};

export default {
    getUserByEmail,
    authenticate,
};
