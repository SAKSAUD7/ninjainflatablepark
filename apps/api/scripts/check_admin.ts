
import { PrismaClient } from '@repo/database';
import { hashPassword } from '../src/utils/password.util';

const prisma = new PrismaClient();

async function checkAdmin() {
    try {
        const email = 'admin@ninjapark.com';
        const user = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User not found. Creating default admin...');
            // Create a default role if it doesn't exist (assuming Role model exists based on my previous code)
            // Actually, let's just check the user first.

            // We need to know if roles exist first.
            const roles = await prisma.role.findMany();
            console.log('Roles available:', roles);

            if (roles.length === 0) {
                console.log("No roles found. Cannot create admin without role.");
                return;
            }

            const hashedPassword = await hashPassword('admin123');
            const newUser = await prisma.adminUser.create({
                data: {
                    email,
                    name: 'Default Admin',
                    password: hashedPassword,
                    roleId: roles[0].id // Assign the first available role
                }
            });
            console.log('Created new admin user:', newUser);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkAdmin();
