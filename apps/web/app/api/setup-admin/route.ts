import { NextResponse } from "next/server";
import { prisma } from "@repo/database";
import { hashPassword } from "../../lib/admin-auth";

export async function GET() {
    try {
        // Check if admin exists
        const adminCount = await prisma.adminUser.count();
        let message = "";

        if (adminCount === 0) {
            // Create default admin
            const hashedPassword = await hashPassword("admin123");
            await prisma.adminUser.create({
                data: {
                    name: "Super Admin",
                    email: "admin@ninja.com",
                    password: hashedPassword,
                    role: "SUPER_ADMIN",
                },
            });
            message = "Created default admin: admin@ninja.com / admin123";
        } else {
            // Reset existing admin password
            const admin = await prisma.adminUser.findFirst({
                where: { email: "admin@ninja.com" }
            });

            if (admin) {
                const hashedPassword = await hashPassword("admin123");
                await prisma.adminUser.update({
                    where: { id: admin.id },
                    data: { password: hashedPassword }
                });
                message = "Reset password for admin@ninja.com to: admin123";
            } else {
                // Create if not found (but count > 0 means other admins exist)
                const hashedPassword = await hashPassword("admin123");
                await prisma.adminUser.create({
                    data: {
                        name: "Super Admin",
                        email: "admin@ninja.com",
                        password: hashedPassword,
                        role: "SUPER_ADMIN",
                    },
                });
                message = "Created admin@ninja.com (other admins existed)";
            }
        }

        return NextResponse.json({
            success: true,
            message,
            admins: await prisma.adminUser.findMany({ select: { email: true, role: true } })
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
