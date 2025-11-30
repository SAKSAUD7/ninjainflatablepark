// Direct test of password hashing and comparison
import { prisma } from '@repo/database';
import { hashPassword, comparePassword } from '../src/utils/password.util';

async function testPasswordFlow() {
    try {
        const email = 'admin@ninjapark.com';
        const password = 'admin123';

        console.log('=== Testing Password Flow ===\n');

        // Get user from database
        const user = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (!user) {
            console.log('❌ User not found in database');
            process.exit(1);
        }

        console.log('✅ User found:');
        console.log('  Email:', user.email);
        console.log('  Stored hash:', user.password);
        console.log('  Hash length:', user.password.length);
        console.log('  Is active:', user.isActive);
        console.log('');

        // Test password comparison
        console.log('Testing password comparison...');
        const isValid = await comparePassword(password, user.password);
        console.log('  Input password:', password);
        console.log('  Comparison result:', isValid);
        console.log('');

        // Generate a fresh hash and compare
        console.log('Generating fresh hash...');
        const freshHash = await hashPassword(password);
        console.log('  Fresh hash:', freshHash);
        console.log('  Fresh hash length:', freshHash.length);
        console.log('');

        const freshComparison = await comparePassword(password, freshHash);
        console.log('  Fresh comparison result:', freshComparison);
        console.log('');

        if (isValid) {
            console.log('✅ Password verification PASSED');
        } else {
            console.log('❌ Password verification FAILED');
            console.log('');
            console.log('Updating password with fresh hash...');
            await prisma.adminUser.update({
                where: { email },
                data: { password: freshHash },
            });
            console.log('✅ Password updated');
        }

        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

testPasswordFlow();
