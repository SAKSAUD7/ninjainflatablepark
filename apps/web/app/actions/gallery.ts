"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";
import { logActivity, calculateChanges } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getGalleryItems() {
    await requirePermission('cms', 'read');

    return await prisma.galleryItem.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getGalleryItem(id: string) {
    await requirePermission('cms', 'read');

    return await prisma.galleryItem.findUnique({
        where: { id }
    });
}

export async function createGalleryItem(data: {
    title: string;
    imageUrl: string;
    category: string;
    active: boolean;
    order: number;
}) {
    await requirePermission('cms', 'write');

    const item = await prisma.galleryItem.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'GALLERY_ITEM',
        entityId: item.id,
        details: { after: item }
    });

    revalidatePath('/admin/misc-content');
    return { success: true, item };
}

export async function updateGalleryItem(id: string, data: {
    title?: string;
    imageUrl?: string;
    category?: string;
    active?: boolean;
    order?: number;
}) {
    await requirePermission('cms', 'write');

    const before = await prisma.galleryItem.findUnique({ where: { id } });

    const item = await prisma.galleryItem.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'GALLERY_ITEM',
        entityId: id,
        details: {
            before,
            after: item,
            changes: calculateChanges(before, item)
        }
    });

    revalidatePath('/admin/misc-content');
    return { success: true };
}

export async function deleteGalleryItem(id: string) {
    await requirePermission('cms', 'delete');

    const item = await prisma.galleryItem.delete({
        where: { id }
    });

    await logActivity({
        action: 'DELETE',
        entity: 'GALLERY_ITEM',
        entityId: id,
        details: { before: item }
    });

    revalidatePath('/admin/misc-content');
    return { success: true };
}
