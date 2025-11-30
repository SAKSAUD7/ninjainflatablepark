
import { PrismaClient } from '@repo/database';
import { comparePassword, hashPassword } from '../src/utils/password.util';

const prisma = new PrismaClient();

async function verify() {
    try {
        console.log('DATABASE_URL:', process.env.DATABASE_URL);
        const email = 'admin@ninjapark.com';
        const password = 'admin123';

        const user = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (!user) {
            console.log('User not found');
            return;
        }

        console.log('User found:', user.email);
        console.log('User updatedAt:', user.updatedAt);
        console.log('Stored hash:', user.password);

        const isValid = await comparePassword(password, user.password);
        console.log('Password valid:', isValid);

        // Test hashing again
        const newHash = await hashPassword(password);
        console.log('New hash:', newHash);
        const isNewHashValid = await comparePassword(password, newHash);
        console.log('New hash valid:', isNewHashValid);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

verify();
