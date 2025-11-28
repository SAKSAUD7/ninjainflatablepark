"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";
import { logActivity, calculateChanges } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getBanners() {
    await requirePermission('cms', 'read');

    return await prisma.banner.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getBanner(id: string) {
    await requirePermission('cms', 'read');

    return await prisma.banner.findUnique({
        where: { id }
    });
}

export async function createBanner(data: {
    title: string;
    imageUrl: string;
    link?: string;
    active: boolean;
    order: number;
}) {
    await requirePermission('cms', 'write');

    const banner = await prisma.banner.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'BANNER',
        entityId: banner.id,
        details: { after: banner }
    });

    revalidatePath('/admin/banners');
    return { success: true, banner };
}

export async function updateBanner(id: string, data: {
    title?: string;
    imageUrl?: string;
    link?: string;
    active?: boolean;
    order?: number;
}) {
    await requirePermission('cms', 'write');

    const before = await prisma.banner.findUnique({ where: { id } });

    const banner = await prisma.banner.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'BANNER',
        entityId: id,
        details: {
            before,
            after: banner,
            changes: calculateChanges(before, banner)
        }
    });

    revalidatePath('/admin/banners');
    return { success: true };
}

export async function deleteBanner(id: string) {
    await requirePermission('cms', 'delete');

    const banner = await prisma.banner.delete({
        where: { id }
    });

    await logActivity({
        action: 'DELETE',
        entity: 'BANNER',
        entityId: id,
        details: { before: banner }
    });

    revalidatePath('/admin/banners');
    return { success: true };
}
