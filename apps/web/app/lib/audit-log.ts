import { prisma } from "@repo/database";
import { getAdminSession } from "./admin-auth";
import { headers } from "next/headers";

export interface LogOptions {
    action: 'LOGIN' | 'LOGOUT' | 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REJECT';
    entity: string;
    entityId?: string;
    details?: {
        before?: any;
        after?: any;
        changes?: string[];
        [key: string]: any;
    };
}

export async function logActivity(options: LogOptions): Promise<void> {
    try {
        const session = await getAdminSession();
        if (!session) return; // Skip logging if no session (or handle system actions differently)

        const headersList = headers();
        const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
        const userAgent = headersList.get('user-agent') || 'unknown';

        await prisma.auditLog.create({
            data: {
                adminId: session.id,
                action: options.action,
                entity: options.entity,
                entityId: options.entityId,
                details: options.details ? JSON.stringify(options.details) : null,
                ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
                userAgent
            }
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
        // Don't throw - logging failure shouldn't break the app flow
    }
}

/**
 * Helper to calculate changes between before/after objects
 */
export function calculateChanges(before: any, after: any): string[] {
    if (!before || !after) return [];

    const changes: string[] = [];
    const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

    for (const key of allKeys) {
        // Skip internal fields
        if (['updatedAt', 'createdAt'].includes(key)) continue;

        // Simple equality check (can be enhanced for deep comparison if needed)
        if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
            changes.push(key);
        }
    }

    return changes;
}
