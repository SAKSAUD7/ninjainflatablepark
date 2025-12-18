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
            // Super Admin: Full Access to Everything
            permissions = ['*:*'];
        } else if (user.role === 'MANAGER') {
            // Manager: Website Management (CMS) ONLY
            permissions = [
                'cms:read',
                'cms:write',
                'cms:delete',
            ];
        } else if (user.role === 'EMPLOYEE' || user.role === 'STAFF') {
            // Employee: Booking Management, Waivers, Dashboard, Contact Messages
            permissions = [
                'dashboard:read',
                'bookings:read',
                'bookings:write',
                'bookings:delete',
                'waivers:read',
                'waivers:write',
                'customers:read',
                'parties:read',
                'parties:write',
                'parties:delete',
                'messages:read',
                'messages:write',
                'entries:read',
                'entries:write',
            ];
        } else if (user.role === 'ADMIN' || user.role === 'CONTENT_MANAGER') {
            // Legacy: Content Manager (same as Manager)
            permissions = [
                'cms:read',
                'cms:write',
                'cms:delete',
            ];
        } else {
            // Fallback: Minimal access
            permissions = ['dashboard:read'];
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

import { redirect } from 'next/navigation';

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
        redirect('/admin/login');
    }

    // Superusers with wildcard permission (*:*) have access to everything
    if (session.permissions?.includes('*:*')) {
        return;
    }

    if (!hasPermission(session.permissions || [], { entity, action })) {
        // Keeps the error for specialized permission failure (logged in but unauthorized)
        // Or could redirect to a 403 page
        throw new Error(`Forbidden: Missing ${entity}:${action} permission`);
    }
}
