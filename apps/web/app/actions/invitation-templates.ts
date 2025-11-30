"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";
import { logActivity, calculateChanges } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getInvitationTemplates() {
    await requirePermission('cms', 'read');

    return await prisma.invitationTemplate.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getInvitationTemplate(id: string) {
    await requirePermission('cms', 'read');

    return await prisma.invitationTemplate.findUnique({
        where: { id }
    });
}

export async function createInvitationTemplate(data: {
    name: string;
    imageUrl: string;
    active: boolean;
}) {
    await requirePermission('cms', 'write');

    const template = await prisma.invitationTemplate.create({
        data
    });

    await logActivity({
        action: 'CREATE',
        entity: 'INVITATION_TEMPLATE',
        entityId: template.id,
        details: { after: template }
    });

    revalidatePath('/admin/invitation-templates');
    return { success: true, template };
}

export async function updateInvitationTemplate(id: string, data: {
    name?: string;
    imageUrl?: string;
    active?: boolean;
}) {
    await requirePermission('cms', 'write');

    const before = await prisma.invitationTemplate.findUnique({ where: { id } });

    const template = await prisma.invitationTemplate.update({
        where: { id },
        data
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'INVITATION_TEMPLATE',
        entityId: id,
        details: {
            before,
            after: template,
            changes: calculateChanges(before, template)
        }
    });

    revalidatePath('/admin/invitation-templates');
    return { success: true };
}

export async function deleteInvitationTemplate(id: string) {
    await requirePermission('cms', 'delete');

    const template = await prisma.invitationTemplate.delete({
        where: { id }
    });

    await logActivity({
        action: 'DELETE',
        entity: 'INVITATION_TEMPLATE',
        entityId: id,
        details: { before: template }
    });

    revalidatePath('/admin/invitation-templates');
    return { success: true };
}
