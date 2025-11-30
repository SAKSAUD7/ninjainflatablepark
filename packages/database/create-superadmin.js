const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createSuperAdmin() {
    try {
        console.log('🔧 Setting up SUPER_ADMIN access...\n');

        // Ensure SUPER_ADMIN role exists
        let superAdminRole = await prisma.role.findFirst({
            where: { name: 'SUPER_ADMIN' }
        });

        if (!superAdminRole) {
            console.log('Creating SUPER_ADMIN role...');
            superAdminRole = await prisma.role.create({
                data: {
                    name: 'SUPER_ADMIN',
                    description: 'Full system access - can manage everything',
                    permissions: '["*:*"]'
                }
            });
            console.log('✅ SUPER_ADMIN role created\n');
        } else {
            console.log('✅ SUPER_ADMIN role exists\n');
        }

        // Check if superadmin@ninja.com exists
        let superAdmin = await prisma.adminUser.findUnique({
            where: { email: 'superadmin@ninja.com' }
        });

        const password = 'SuperAdmin@123';
        const hashedPassword = await bcrypt.hash(password, 10);

        if (superAdmin) {
            // Update existing
            superAdmin = await prisma.adminUser.update({
                where: { email: 'superadmin@ninja.com' },
                data: {
                    password: hashedPassword,
                    roleId: superAdminRole.id,
                    isActive: true
                }
            });
            console.log('✅ Updated existing superadmin user\n');
        } else {
            // Create new
            superAdmin = await prisma.adminUser.create({
                data: {
                    name: 'Super Administrator',
                    email: 'superadmin@ninja.com',
                    password: hashedPassword,
                    roleId: superAdminRole.id,
                    isActive: true
                }
            });
            console.log('✅ Created new superadmin user\n');
        }

        // Also fix the original admin@ninja.com user
        const originalAdmin = await prisma.adminUser.findUnique({
            where: { email: 'admin@ninja.com' }
        });

        if (originalAdmin) {
            await prisma.adminUser.update({
                where: { email: 'admin@ninja.com' },
                data: {
                    roleId: superAdminRole.id,
                    isActive: true
                }
            });
            console.log('✅ Fixed admin@ninja.com role to SUPER_ADMIN\n');
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log('🎉 SUPER ADMIN ACCESS CREDENTIALS');
        console.log('═══════════════════════════════════════════════════════');
        console.log('\n📧 Email:    superadmin@ninja.com');
        console.log('🔑 Password: SuperAdmin@123');
        console.log('\n--- OR ---\n');
        console.log('📧 Email:    admin@ninja.com');
        console.log('🔑 Password: admin123');
        console.log('\n═══════════════════════════════════════════════════════');
        console.log('\n✨ Both accounts now have FULL SUPER_ADMIN access!');
        console.log('✨ Please logout and login with either account to see all navigation options.\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    }
}

createSuperAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Failed:', error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
