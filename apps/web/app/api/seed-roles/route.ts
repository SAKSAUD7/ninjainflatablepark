import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

const PREDEFINED_ROLES = [
    {
        name: "SUPER_ADMIN",
        description: "Full system access - can manage everything including other admins",
        permissions: ["*:*"]
    },
    {
        name: "MANAGER",
        description: "Operations management - bookings, parties, vouchers, customers",
        permissions: [
            "bookings:*",
            "parties:*",
            "vouchers:*",
            "waivers:read",
            "waivers:write",
            "customers:read",
            "customers:write",
            "cms:read",
            "logs:read"
        ]
    },
    {
        name: "STAFF",
        description: "Day-to-day operations - handle bookings and waivers",
        permissions: [
            "bookings:read",
            "bookings:write",
            "parties:read",
            "parties:write",
            "waivers:read",
            "waivers:write",
            "customers:read"
        ]
    },
    {
        name: "CONTENT_EDITOR",
        description: "Content management - manage website content and media",
        permissions: [
            "cms:*",
            "bookings:read"
        ]
    },
    {
        name: "VIEWER",
        description: "Read-only access - can view but not modify data",
        permissions: [
            "bookings:read",
            "parties:read",
            "vouchers:read",
            "waivers:read",
            "customers:read",
            "cms:read",
            "logs:read"
        ]
    }
];

export async function GET() {
    try {
        const results = [];

        for (const roleData of PREDEFINED_ROLES) {
            // Check if role exists
            const existing = await prisma.role.findUnique({
                where: { name: roleData.name }
            });

            if (existing) {
                // Update existing role
                const updated = await prisma.role.update({
                    where: { name: roleData.name },
                    data: {
                        description: roleData.description,
                        permissions: JSON.stringify(roleData.permissions)
                    }
                });
                results.push({ action: "updated", role: updated.name });
            } else {
                // Create new role
                const created = await prisma.role.create({
                    data: {
                        name: roleData.name,
                        description: roleData.description,
                        permissions: JSON.stringify(roleData.permissions)
                    }
                });
                results.push({ action: "created", role: created.name });
            }
        }

        return NextResponse.json({
            success: true,
            message: "Roles seeded successfully",
            results,
            roles: await prisma.role.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    permissions: true,
                    _count: { select: { users: true } }
                }
            })
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
