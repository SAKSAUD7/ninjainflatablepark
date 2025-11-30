import { prisma } from '@repo/database';

async function fixAdminPermissions() {
    try {
        console.log('Checking admin user and role...\n');

        // Get admin user
        const admin = await prisma.adminUser.findUnique({
            where: { email: 'admin@ninjapark.com' },
            include: { role: true }
        });

        if (!admin) {
            console.log('❌ Admin user not found!');
            return;
        }

        console.log('Admin User:');
        console.log('  Email:', admin.email);
        console.log('  Name:', admin.name);
        console.log('  Active:', admin.isActive);
        console.log('  Role:', admin.role?.name || 'No role');
        console.log('  Role ID:', admin.roleId);
        console.log('');

        if (admin.role) {
            console.log('Current Role Permissions:');
            console.log('  ', admin.role.permissions);
            console.log('');
        }

        // Update role to have all permissions
        if (admin.role) {
            const updatedRole = await prisma.role.update({
                where: { id: admin.role.id },
                data: {
                    permissions: JSON.stringify(['*']) // All permissions
                }
            });

            console.log('✅ Updated role permissions to: ["*"] (all permissions)');
        } else {
            console.log('⚠️  Admin user has no role assigned!');

            // Create Super Admin role if it doesn't exist
            let superAdminRole = await prisma.role.findFirst({
                where: { name: 'Super Admin' }
            });

            if (!superAdminRole) {
                superAdminRole = await prisma.role.create({
                    data: {
                        name: 'Super Admin',
                        permissions: JSON.stringify(['*'])
                    }
                });
                console.log('✅ Created Super Admin role');
            }

            // Assign role to admin
            await prisma.adminUser.update({
                where: { id: admin.id },
                data: { roleId: superAdminRole.id }
            });

            console.log('✅ Assigned Super Admin role to admin user');
        }

        // Verify final state
        const updatedAdmin = await prisma.adminUser.findUnique({
            where: { email: 'admin@ninjapark.com' },
            include: { role: true }
        });

        console.log('\nFinal Admin State:');
        console.log('  Email:', updatedAdmin?.email);
        console.log('  Role:', updatedAdmin?.role?.name);
        console.log('  Permissions:', updatedAdmin?.role?.permissions);
        console.log('\n✅ Admin user now has full Super Admin access!');

        await prisma.$disconnect();
    } catch (error) {
        console.error('❌ Error:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

fixAdminPermissions();
