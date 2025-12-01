import { cookies } from 'next/headers';
import { hasPermission, type Permission } from './permissions';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface AdminSession {
    id: string;
    email: string;
    name: string;
    role: string;
    permissions?: Permission[];
}

export async function getAdminSession(): Promise<AdminSession | null> {
    const token = cookies().get('admin_token')?.value;

    if (!token) return null;

    try {
        const res = await fetch(`${API_URL}/core/users/me/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store"
        });

        if (!res.ok) return null;

        const user = await res.json();

        // Map roles to permissions
        // Ideally this should come from the backend
        let permissions: Permission[] = [];
        if (user.is_superuser || user.role === 'SUPER_ADMIN') {
            permissions = ['*:*'];
        } else {
            // Default permissions for other roles
            // This logic should match what was in the DB or be fetched from backend
            permissions = ['bookings:read', 'bookings:write'];
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions
        };
    } catch (error) {
        return null;
    }
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

    // Superusers with wildcard permission (*:*) have access to everything
    if (session.permissions?.includes('*:*')) {
        return;
    }

    if (!hasPermission(session.permissions || [], { entity, action })) {
        throw new Error(`Forbidden: Missing ${entity}:${action} permission`);
    }
}
