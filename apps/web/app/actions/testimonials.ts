"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";
import { logActivity, calculateChanges } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
    await requirePermission('cms', 'read');

    return await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getTestimonial(id: string) {
    await requirePermission('cms', 'read');

    return await prisma.testimonial.findUnique({
        where: { id }
    });
}

export async function createTestimonial(data: {
    name: string;
    role?: string;
    content: string;
    rating: number;
    imageUrl?: string;
    active: boolean;
}) {
    await requirePermission('cms', 'write');

    const testimonial = await prisma.testimonial.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'TESTIMONIAL',
        entityId: testimonial.id,
        details: { after: testimonial }
    });

    revalidatePath('/admin/testimonials');
    return { success: true, testimonial };
}

export async function updateTestimonial(id: string, data: {
    name?: string;
    role?: string;
    content?: string;
    rating?: number;
    imageUrl?: string;
    active?: boolean;
}) {
    await requirePermission('cms', 'write');

    const before = await prisma.testimonial.findUnique({ where: { id } });

    const testimonial = await prisma.testimonial.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'TESTIMONIAL',
        entityId: id,
        details: {
            before,
            after: testimonial,
            changes: calculateChanges(before, testimonial)
        }
    });

    revalidatePath('/admin/testimonials');
    return { success: true };
}

export async function deleteTestimonial(id: string) {
    await requirePermission('cms', 'delete');

    const testimonial = await prisma.testimonial.delete({
        where: { id }
    });

    await logActivity({
        action: 'DELETE',
        entity: 'TESTIMONIAL',
        entityId: id,
        details: { before: testimonial }
    });

    revalidatePath('/admin/testimonials');
    return { success: true };
}
