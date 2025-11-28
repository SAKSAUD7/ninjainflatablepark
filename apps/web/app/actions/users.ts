"use server";

import { prisma } from "@repo/database";
import { requirePermission, hashPassword } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getAdminUsers(search?: string) {
    await requirePermission('users', 'read');

    const where: any = {};
    if (search) {
        where.OR = [
            { name: { contains: search } },
            { email: { contains: search } }
        ];
    }

    return await prisma.adminUser.findMany({
        where,
        include: { role: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function createAdminUser(data: {
    name: string;
    email: string;
    password: string;
    roleId: string;
}) {
    await requirePermission('users', 'write');

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.adminUser.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            roleId: data.roleId
        },
        include: { role: true }
    });

    await logActivity({
        action: 'CREATE',
        entity: 'ADMIN_USER',
        entityId: user.id,
        details: { after: { name: user.name, email: user.email, role: user.role?.name } }
    });

    revalidatePath('/admin/users');
    return { success: true, user };
}

export async function updateAdminUser(id: string, data: {
    name?: string;
    email?: string;
    roleId?: string;
    isActive?: boolean;
}) {
    await requirePermission('users', 'write');

    const before = await prisma.adminUser.findUnique({
        where: { id },
        include: { role: true }
    });

    const user = await prisma.adminUser.update({
        where: { id },
        data,
        include: { role: true }
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'ADMIN_USER',
        entityId: id,
        details: {
            before: { name: before?.name, email: before?.email, role: before?.role?.name, isActive: before?.isActive },
            after: { name: user.name, email: user.email, role: user.role?.name, isActive: user.isActive }
        }
    });

    revalidatePath('/admin/users');
    return { success: true };
}

export async function deleteAdminUser(id: string) {
    await requirePermission('users', 'delete');

    const user = await prisma.adminUser.delete({
        where: { id },
        include: { role: true }
    });

    await logActivity({
        action: 'DELETE',
        entity: 'ADMIN_USER',
        entityId: id,
        details: { before: { name: user.name, email: user.email } }
    });

    revalidatePath('/admin/users');
    return { success: true };
}

export async function getRoles() {
    await requirePermission('roles', 'read');

    return await prisma.role.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function getAdminUser(id: string) {
    await requirePermission('users', 'read');

    return await prisma.adminUser.findUnique({
        where: { id },
        include: { role: true }
    });
}

export async function getUserStats() {
    await requirePermission('users', 'read');

    const [totalUsers, activeUsers, roleDistribution, recentLogins] = await Promise.all([
        prisma.adminUser.count(),
        prisma.adminUser.count({ where: { isActive: true } }),
        prisma.adminUser.groupBy({
            by: ['roleId'],
            _count: true,
            where: { roleId: { not: null } }
        }),
        prisma.adminUser.count({
            where: {
                lastLoginAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0))
                }
            }
        })
    ]);

    // Get role names for distribution
    const roles = await prisma.role.findMany();
    const roleMap = new Map(roles.map(r => [r.id, r.name]));

    const distribution = roleDistribution.map(item => ({
        role: roleMap.get(item.roleId || '') || 'No Role',
        count: item._count
    }));

    return {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        recentLogins,
        roleDistribution: distribution
    };
}

export async function getRecentActivity(limit: number = 10) {
    await requirePermission('users', 'read');

    return await prisma.adminUser.findMany({
        where: {
            lastLoginAt: { not: null }
        },
        include: { role: true },
        orderBy: { lastLoginAt: 'desc' },
        take: limit
    });
}

export async function toggleUserStatus(id: string) {
    await requirePermission('users', 'write');

    const user = await prisma.adminUser.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');

    await prisma.adminUser.update({
        where: { id },
        data: { isActive: !user.isActive }
    });

    await logActivity({
        action: 'UPDATE',
        entity: 'ADMIN_USER',
        entityId: id,
        details: {
            before: { isActive: user.isActive },
            after: { isActive: !user.isActive }
        }
    });

    revalidatePath('/admin/users');
    return { success: true };
}

