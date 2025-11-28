"use server";

import { prisma } from "@repo/database";
import { requirePermission } from "../lib/admin-auth";

export async function getAuditLogs(filters?: {
    adminId?: string;
    entity?: string;
    action?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
}) {
    await requirePermission('logs', 'read');

    const where: any = {};
    if (filters?.adminId) where.adminId = filters.adminId;
    if (filters?.entity) where.entity = filters.entity;
    if (filters?.action) where.action = filters.action;
    if (filters?.startDate || filters?.endDate) {
        where.createdAt = {};
        if (filters.startDate) where.createdAt.gte = filters.startDate;
        if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    return await prisma.auditLog.findMany({
        where,
        include: { admin: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        take: filters?.limit || 100
    });
}

export async function getLogStats() {
    await requirePermission('logs', 'read');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalLogs, logsToday, actionsByType] = await Promise.all([
        prisma.auditLog.count(),
        prisma.auditLog.count({
            where: { createdAt: { gte: today } }
        }),
        prisma.auditLog.groupBy({
            by: ['action'],
            _count: true
        })
    ]);

    return {
        totalLogs,
        logsToday,
        actionsByType
    };
}
