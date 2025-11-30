// This script creates an admin user in the SAME database the server uses
// by importing the Prisma client from the exact same location

import { prisma } from '@repo/database';
import { hashPassword } from '../src/utils/password.util';

async function createAdminUser() {
    try {
        console.log('Creating admin user in server database...');
        console.log('DATABASE_URL:', process.env.DATABASE_URL);

        const email = 'admin@ninjapark.com';
        const password = 'admin123';

        // Check if user already exists
        const existingUser = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log('Admin user already exists. Updating password...');
            const hashedPassword = await hashPassword(password);

            const updated = await prisma.adminUser.update({
                where: { email },
                data: {
                    password: hashedPassword,
                    isActive: true,
                },
            });

            console.log('✅ Admin user password updated successfully!');
            console.log('User ID:', updated.id);
            console.log('Email:', updated.email);
            console.log('Updated at:', updated.updatedAt);
        } else {
            console.log('Creating new admin user...');
            const hashedPassword = await hashPassword(password);

            // Get or create Super Admin role
            let role = await prisma.role.findFirst({
                where: { name: 'Super Admin' },
            });

            if (!role) {
                console.log('Creating Super Admin role...');
                role = await prisma.role.create({
                    data: {
                        name: 'Super Admin',
                        permissions: JSON.stringify(['*']), // All permissions
                    },
                });
            }

            const user = await prisma.adminUser.create({
                data: {
                    name: 'Admin',
                    email,
                    password: hashedPassword,
                    roleId: role.id,
                    isActive: true,
                },
            });

            console.log('✅ Admin user created successfully!');
            console.log('User ID:', user.id);
            console.log('Email:', user.email);
            console.log('Role:', role.name);
        }

        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

createAdminUser();
