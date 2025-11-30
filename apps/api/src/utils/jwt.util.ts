import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/env';

export interface JWTPayload {
    userId: string;
    email: string;
    roleId?: string;
}

export const generateToken = (payload: JWTPayload): string => {
    const options: any = {
        expiresIn: config.jwt.expiresIn,
    };
    return jwt.sign(payload, config.jwt.secret as Secret, options);
};

export const generateRefreshToken = (payload: JWTPayload): string => {
    const options: any = {
        expiresIn: config.jwt.refreshExpiresIn,
    };
    return jwt.sign(payload, config.jwt.secret as Secret, options);
};

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const verifyToken = (token: string): JWTPayload => {
    try {
        return jwt.verify(token, config.jwt.secret) as JWTPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const decodeToken = (token: string): JWTPayload | null => {
    try {
        return jwt.decode(token) as JWTPayload;
    } catch (error) {
        return null;
    }
};
