"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";
import { logActivity, calculateChanges } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getFaqs() {
    await requirePermission('cms', 'read');

    return await prisma.faq.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getFaq(id: string) {
    await requirePermission('cms', 'read');

    return await prisma.faq.findUnique({
        where: { id }
    });
}

export async function createFaq(data: {
    question: string;
    answer: string;
    category?: string;
    active: boolean;
    order: number;
}) {
    await requirePermission('cms', 'write');

    const faq = await prisma.faq.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'FAQ',
        entityId: faq.id,
        details: { after: faq }
    });

    revalidatePath('/admin/faqs');
    return { success: true, faq };
}

export async function updateFaq(id: string, data: {
    question?: string;
    answer?: string;
    category?: string;
    active?: boolean;
    order?: number;
}) {
    await requirePermission('cms', 'write');

    const before = await prisma.faq.findUnique({ where: { id } });

    const faq = await prisma.faq.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'FAQ',
        entityId: id,
        details: {
            before,
            after: faq,
            changes: calculateChanges(before, faq)
        }
    });

    revalidatePath('/admin/faqs');
    return { success: true };
}

export async function deleteFaq(id: string) {
    await requirePermission('cms', 'delete');

    const faq = await prisma.faq.delete({
        where: { id }
    });

    await logActivity({
        action: 'DELETE',
        entity: 'FAQ',
        entityId: id,
        details: { before: faq }
    });

    revalidatePath('/admin/faqs');
    return { success: true };
}
