import { UserTypes } from '@prisma/client';
import jwt from 'jsonwebtoken';

const generateJwtToken = (username: string, userType: UserTypes): string => {
    const options = {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,
        issuer: 'ISP submission system',
    };

    try {
        return jwt.sign({ username, userType }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
