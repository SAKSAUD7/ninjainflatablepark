import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { getAdminPermissions, hasPermission, type Permission } from './permissions';

const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-admin-key-change-me';
const key = new TextEncoder().encode(SECRET_KEY);

export interface AdminSession {
    id: string;
    email: string;
    role: string;
    roleId?: string;
    permissions?: Permission[];
}

export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, key);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function comparePassword(plain: string, hashed: string) {
    return await bcrypt.compare(plain, hashed);
}

export async function getAdminSession(): Promise<AdminSession | null> {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    // Fetch fresh permissions from database
    const permissions = await getAdminPermissions(payload.id as string);

    return {
        id: payload.id as string,
        email: payload.email as string,
        role: payload.role as string,
        roleId: payload.roleId as string | undefined,
        permissions
    };
}

/**
 * Require a specific permission for server actions
 * Throws error if user doesn't have permission
 */
export async function requirePermission(
    entity: string,
    action: 'read' | 'write' | 'delete'
): Promise<void> {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized: No admin session");
    }

    if (!hasPermission(session.permissions || [], { entity, action })) {
        throw new Error(`Forbidden: Missing ${entity}:${action} permission`);
    }
}
