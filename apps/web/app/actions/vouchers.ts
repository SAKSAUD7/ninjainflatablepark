"use server";

import { prisma } from "@repo/database";
import { getAdminSession } from "../lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function getVouchers() {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    return prisma.voucher.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getVoucher(id: string) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    return prisma.voucher.findUnique({
        where: { id }
    });
}

export async function createVoucher(data: {
    code: string;
    discountType: string;
    discountValue: number;
    minOrderAmount?: number;
    expiryDate?: Date;
    usageLimit?: number;
    description?: string;
}) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.voucher.create({
        data: {
            ...data,
            isActive: true
        }
    });

    revalidatePath("/admin/vouchers");
}

export async function updateVoucher(id: string, data: {
    code?: string;
    discountType?: string;
    discountValue?: number;
    minOrderAmount?: number;
    expiryDate?: Date;
    usageLimit?: number;
    description?: string;
    isActive?: boolean;
}) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.voucher.update({
        where: { id },
        data
    });

    revalidatePath("/admin/vouchers");
}

export async function deleteVoucher(id: string) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.voucher.delete({
        where: { id }
    });

    revalidatePath("/admin/vouchers");
}
