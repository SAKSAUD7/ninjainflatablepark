import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultRoles = [
    {
        name: 'SUPER_ADMIN',
        description: 'Full system access - can manage everything',
        permissions: JSON.stringify([
            'bookings:*',
            'parties:*',
            'waivers:*',
            'vouchers:*',
            'cms:*',
            'users:*',
            'roles:*',
            'logs:*',
            'shop:*',
            'attractions:*',
            'holidays:*'
        ])
    },
    {
        name: 'MANAGER',
        description: 'Manage bookings, parties, and content',
        permissions: JSON.stringify([
            'bookings:read',
            'bookings:write',
            'parties:read',
            'parties:write',
            'waivers:read',
            'waivers:write',
            'vouchers:read',
            'vouchers:write',
            'cms:read',
            'cms:write',
            'logs:read'
        ])
    },
    {
        name: 'STAFF',
        description: 'Operations staff - handle bookings and waivers',
        permissions: JSON.stringify([
            'bookings:read',
            'bookings:write',
            'parties:read',
            'waivers:read',
            'waivers:write'
        ])
    },
    {
        name: 'CONTENT_EDITOR',
        description: 'Manage website content only',
        permissions: JSON.stringify([
            'cms:read',
            'cms:write',
            'attractions:read',
            'attractions:write'
        ])
    },
    {
        name: 'VIEWER',
        description: 'Read-only access to all data',
        permissions: JSON.stringify([
            'bookings:read',
            'parties:read',
            'waivers:read',
            'vouchers:read',
            'logs:read'
        ])
    }
];

async function seedRoles() {
    console.log('🌱 Seeding roles...');

    for (const role of defaultRoles) {
        const existing = await prisma.role.findUnique({
            where: { name: role.name }
        });

        if (existing) {
            // Update existing role
            await prisma.role.update({
                where: { name: role.name },
                data: role
            });
            console.log(`✅ Updated role: ${role.name}`);
        } else {
            // Create new role
            await prisma.role.create({
                data: role
            });
            console.log(`✅ Created role: ${role.name}`);
        }
    }

    console.log('\n🎉 Roles seeded successfully!');
    console.log('\nAvailable roles:');
    const roles = await prisma.role.findMany();
    roles.forEach(r => {
        console.log(`  - ${r.name}: ${r.description}`);
    });
}

seedRoles()
    .catch((error) => {
        console.error('❌ Error seeding roles:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
