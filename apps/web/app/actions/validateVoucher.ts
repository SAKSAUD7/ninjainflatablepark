"use server";

import { prisma } from "@repo/database";

export async function validateVoucher(code: string, orderAmount: number) {
    try {
        if (!code) {
            return { success: false, error: "Voucher code is required" };
        }

        const voucher = await prisma.voucher.findUnique({
            where: { code: code },
        });

        if (!voucher) {
            return { success: false, error: "Invalid voucher code" };
        }

        if (!voucher.isActive) {
            return { success: false, error: "This voucher is no longer active" };
        }

        if (voucher.expiryDate && new Date(voucher.expiryDate) < new Date()) {
            return { success: false, error: "This voucher has expired" };
        }

        if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
            return { success: false, error: "This voucher has reached its usage limit" };
        }

        if (voucher.minOrderAmount && orderAmount < voucher.minOrderAmount) {
            return {
                success: false,
                error: `Minimum order amount of ₹${voucher.minOrderAmount} required`
            };
        }

        // Calculate discount
        let discountAmount = 0;
        if (voucher.discountType === "PERCENTAGE") {
            discountAmount = (orderAmount * voucher.discountValue) / 100;
        } else {
            discountAmount = voucher.discountValue;
        }

        // Ensure discount doesn't exceed order amount
        discountAmount = Math.min(discountAmount, orderAmount);

        return {
            success: true,
            discount: discountAmount,
            type: voucher.discountType,
            value: voucher.discountValue,
            code: voucher.code,
            id: voucher.id
        };

    } catch (error) {
        console.error("Voucher validation error:", error);
        return { success: false, error: "Failed to validate voucher" };
    }
}
