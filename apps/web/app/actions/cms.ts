"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

// ========== FREE ENTRIES ==========

export async function getFreeEntries(status?: string) {
    await requirePermission('entries', 'read');

    const where: any = {};
    if (status) {
        where.status = status;
    }

    return await prisma.freeEntry.findMany({
        where,
        orderBy: { createdAt: 'desc' }
    });
}

export async function createFreeEntry(data: {
    name: string;
    email: string;
    phone?: string;
    reason: string;
}) {
    const entry = await prisma.freeEntry.create({
        data: {
            ...data,
            status: "PENDING"
        }
    });

    return { success: true, entry };
}

export async function updateFreeEntryStatus(id: string, status: string, notes?: string) {
    await requirePermission('entries', 'write');

    const entry = await prisma.freeEntry.update({
        where: { id },
        data: { status, notes }
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'FREE_ENTRY',
        entityId: id,
        details: { status, notes }
    });

    revalidatePath('/admin/free-entries');
    return { success: true };
}

export async function deleteFreeEntry(id: string) {
    await requirePermission('entries', 'delete');

    await prisma.freeEntry.delete({ where: { id } });

    await logActivity({
        action: 'DELETE',
        entity: 'FREE_ENTRY',
        entityId: id
    });

    revalidatePath('/admin/free-entries');
    return { success: true };
}

// ========== STATIC PAGES ==========

export async function getStaticPages() {
    await requirePermission('cms', 'read');

    return await prisma.staticPage.findMany({
        orderBy: { title: 'asc' }
    });
}

export async function getStaticPage(id: string) {
    await requirePermission('cms', 'read');

    return await prisma.staticPage.findUnique({
        where: { id }
    });
}

export async function createStaticPage(data: {
    slug: string;
    title: string;
    content: string;
    published?: boolean;
    metaTitle?: string;
    metaDesc?: string;
}) {
    await requirePermission('cms', 'write');

    const page = await prisma.staticPage.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'STATIC_PAGE',
        entityId: page.id,
        details: { title: page.title, slug: page.slug }
    });

    revalidatePath('/admin/static-pages');
    return { success: true, page };
}

export async function updateStaticPage(id: string, data: {
    slug?: string;
    title?: string;
    content?: string;
    published?: boolean;
    metaTitle?: string;
    metaDesc?: string;
}) {
    await requirePermission('cms', 'write');

    const page = await prisma.staticPage.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'STATIC_PAGE',
        entityId: id,
        details: { title: page.title }
    });

    revalidatePath('/admin/static-pages');
    return { success: true };
}

export async function deleteStaticPage(id: string) {
    await requirePermission('cms', 'delete');

    await prisma.staticPage.delete({ where: { id } });

    await logActivity({
        action: 'DELETE',
        entity: 'STATIC_PAGE',
        entityId: id
    });

    revalidatePath('/admin/static-pages');
    return { success: true };
}

// ========== SOCIAL LINKS ==========

export async function getSocialLinks() {
    await requirePermission('cms', 'read');

    return await prisma.socialLink.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function createSocialLink(data: {
    platform: string;
    url: string;
    icon?: string;
    order?: number;
}) {
    await requirePermission('cms', 'write');

    const link = await prisma.socialLink.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'SOCIAL_LINK',
        entityId: link.id,
        details: { platform: link.platform }
    });

    revalidatePath('/admin/social-media');
    return { success: true, link };
}

export async function updateSocialLink(id: string, data: {
    platform?: string;
    url?: string;
    icon?: string;
    order?: number;
    active?: boolean;
}) {
    await requirePermission('cms', 'write');

    await prisma.socialLink.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'SOCIAL_LINK',
        entityId: id
    });

    revalidatePath('/admin/social-media');
    return { success: true };
}

export async function deleteSocialLink(id: string) {
    await requirePermission('cms', 'delete');

    await prisma.socialLink.delete({ where: { id } });

    await logActivity({
        action: 'DELETE',
        entity: 'SOCIAL_LINK',
        entityId: id
    });

    revalidatePath('/admin/social-media');
    return { success: true };
}

// ========== PRODUCTS ==========

export async function getProducts() {
    await requirePermission('shop', 'read');

    return await prisma.product.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function getProduct(id: string) {
    await requirePermission('shop', 'read');

    return await prisma.product.findUnique({
        where: { id }
    });
}

export async function createProduct(data: {
    name: string;
    description: string;
    price: number;
    stock?: number;
    imageUrl?: string;
    category?: string;
}) {
    await requirePermission('shop', 'write');

    const product = await prisma.product.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'PRODUCT',
        entityId: product.id,
        details: { name: product.name, price: product.price }
    });

    revalidatePath('/admin/shop');
    return { success: true, product };
}

export async function updateProduct(id: string, data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;
    category?: string;
    active?: boolean;
}) {
    await requirePermission('shop', 'write');

    await prisma.product.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'PRODUCT',
        entityId: id
    });

    revalidatePath('/admin/shop');
    return { success: true };
}

export async function deleteProduct(id: string) {
    await requirePermission('shop', 'delete');

    await prisma.product.delete({ where: { id } });

    await logActivity({
        action: 'DELETE',
        entity: 'PRODUCT',
        entityId: id
    });

    revalidatePath('/admin/shop');
    return { success: true };
}
