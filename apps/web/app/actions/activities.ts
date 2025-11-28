"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";
import { logActivity, calculateChanges } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getActivities() {
    await requirePermission('cms', 'read');

    return await prisma.activity.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getActivity(id: string) {
    await requirePermission('cms', 'read');

    return await prisma.activity.findUnique({
        where: { id }
    });
}

export async function createActivity(data: {
    name: string;
    description: string;
    imageUrl: string;
    active: boolean;
    order: number;
}) {
    await requirePermission('cms', 'write');

    const activity = await prisma.activity.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'ACTIVITY',
        entityId: activity.id,
        details: { after: activity }
    });

    revalidatePath('/admin/activities');
    return { success: true, activity };
}

export async function updateActivity(id: string, data: {
    name?: string;
    description?: string;
    imageUrl?: string;
    active?: boolean;
    order?: number;
}) {
    await requirePermission('cms', 'write');

    const before = await prisma.activity.findUnique({ where: { id } });

    const activity = await prisma.activity.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'ACTIVITY',
        entityId: id,
        details: {
            before,
            after: activity,
            changes: calculateChanges(before, activity)
        }
    });

    revalidatePath('/admin/activities');
    return { success: true };
}

export async function deleteActivity(id: string) {
    await requirePermission('cms', 'delete');

    const activity = await prisma.activity.delete({
        where: { id }
    });

    await logActivity({
        action: 'DELETE',
        entity: 'ACTIVITY',
        entityId: id,
        details: { before: activity }
    });

    revalidatePath('/admin/activities');
    return { success: true };
}
