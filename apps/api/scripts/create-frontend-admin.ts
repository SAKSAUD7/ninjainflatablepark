import { prisma } from '@repo/database';
import { hashPassword } from '../src/utils/auth.utils';

async function createAdminForFrontend() {
    try {
        console.log('Creating admin user for frontend...\n');

        // Check if admin exists
        const existingAdmin = await prisma.adminUser.findFirst({
            where: {
                OR: [
                    { email: 'admin@ninja.com' },
                    { email: 'admin@ninjapark.com' }
                ]
            },
            include: { role: true }
        });

        if (existingAdmin) {
            console.log('✅ Admin user already exists:');
            console.log('   Email:', existingAdmin.email);
            console.log('   Role:', existingAdmin.role?.name || 'No role');
            console.log('   Active:', existingAdmin.isActive);
            console.log('\nUse this email to login:', existingAdmin.email);
            console.log('Password: admin123');
            await prisma.$disconnect();
            return;
        }

        // Get or create Super Admin role
        let superAdminRole = await prisma.role.findFirst({
            where: { name: 'SUPER_ADMIN' }
        });

        if (!superAdminRole) {
            superAdminRole = await prisma.role.create({
                data: {
                    name: 'SUPER_ADMIN',
                    permissions: JSON.stringify(['*'])
                }
            });
            console.log('✅ Created SUPER_ADMIN role');
        }

        // Create admin user
        const hashedPassword = await hashPassword('admin123');

        const admin = await prisma.adminUser.create({
            data: {
                name: 'Super Admin',
                email: 'admin@ninja.com',
                password: hashedPassword,
                roleId: superAdminRole.id,
                isActive: true
            },
            include: { role: true }
        });

        console.log('✅ Admin user created successfully!');
        console.log('\nLogin Credentials:');
        console.log('   Email: admin@ninja.com');
        console.log('   Password: admin123');
        console.log('   Role:', admin.role?.name);

        await prisma.$disconnect();
    } catch (error) {
        console.error('❌ Error:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

createAdminForFrontend();
