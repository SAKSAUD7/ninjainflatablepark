import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAndFixAdmin() {
    console.log('🔍 Checking admin user and roles...\n');

    // Check all roles
    const roles = await prisma.role.findMany();
    console.log('Available roles:');
    roles.forEach(r => {
        console.log(`  - ${r.name}: ${r.permissions}`);
    });

    // Check admin user
    const admin = await prisma.adminUser.findUnique({
        where: { email: 'admin@ninja.com' },
        include: { role: true }
    });

    if (!admin) {
        console.log('\n❌ Admin user not found!');
        return;
    }

    console.log(`\n📋 Current admin user:`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  Name: ${admin.name}`);
    console.log(`  Role: ${admin.role?.name || 'NO ROLE'}`);
    console.log(`  RoleId: ${admin.roleId || 'NONE'}`);

    // Find SUPER_ADMIN role
    const superAdminRole = roles.find(r => r.name === 'SUPER_ADMIN');

    if (!superAdminRole) {
        console.log('\n❌ SUPER_ADMIN role not found!');
        console.log('Creating SUPER_ADMIN role...');

        const newRole = await prisma.role.create({
            data: {
                name: 'SUPER_ADMIN',
                description: 'Full system access',
                permissions: '["*:*"]'
            }
        });

        console.log('✅ Created SUPER_ADMIN role');

        // Update admin user
        await prisma.adminUser.update({
            where: { email: 'admin@ninja.com' },
            data: { roleId: newRole.id }
        });

        console.log('✅ Updated admin user to SUPER_ADMIN');
    } else if (admin.roleId !== superAdminRole.id) {
        console.log(`\n🔧 Updating admin from ${admin.role?.name} to SUPER_ADMIN...`);

        await prisma.adminUser.update({
            where: { email: 'admin@ninja.com' },
            data: { roleId: superAdminRole.id }
        });

        console.log('✅ Admin user updated to SUPER_ADMIN');
    } else {
        console.log('\n✅ Admin user already has SUPER_ADMIN role');
    }

    // Verify final state
    const updatedAdmin = await prisma.adminUser.findUnique({
        where: { email: 'admin@ninja.com' },
        include: { role: true }
    });

    console.log(`\n🎉 Final state:`);
    console.log(`  Email: ${updatedAdmin?.email}`);
    console.log(`  Role: ${updatedAdmin?.role?.name}`);
    console.log(`  Permissions: ${updatedAdmin?.role?.permissions}`);
    console.log(`\n✨ Please logout and login again to see all navigation options!`);
}

checkAndFixAdmin()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
