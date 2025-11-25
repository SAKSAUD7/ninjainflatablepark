import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create sample bookings
    await prisma.booking.createMany({
        data: [
            {
                name: 'Rajesh Kumar',
                email: 'rajesh.kumar@example.com',
                phone: '+91 98765 43210',
                date: '2025-12-15',
                time: '10:00 AM',
                duration: '2 hours',
                adults: 2,
                kids: 3,
                spectators: 1,
                amount: 2500,
                status: 'CONFIRMED',
            },
            {
                name: 'Priya Sharma',
                email: 'priya.sharma@example.com',
                phone: '+91 98765 43211',
                date: '2025-12-16',
                time: '2:00 PM',
                duration: '3 hours',
                adults: 4,
                kids: 5,
                spectators: 2,
                amount: 4500,
                status: 'CONFIRMED',
            },
            {
                name: 'Amit Patel',
                email: 'amit.patel@example.com',
                phone: '+91 98765 43212',
                date: '2025-12-20',
                time: '11:00 AM',
                duration: '2 hours',
                adults: 3,
                kids: 2,
                spectators: 0,
                amount: 2000,
                status: 'PENDING',
            },
        ],
    });

    // Create sample contact inquiries
    await prisma.contactInquiry.createMany({
        data: [
            {
                name: 'Sneha Reddy',
                email: 'sneha.reddy@example.com',
                phone: '+91 98765 43213',
                subject: 'Birthday Party Booking',
                message: 'Hi, I would like to book for my daughter\'s 8th birthday party. Can you provide details about party packages?',
                status: 'NEW',
            },
            {
                name: 'Vikram Singh',
                email: 'vikram.singh@example.com',
                phone: '+91 98765 43214',
                subject: 'Group Discount Query',
                message: 'Do you offer group discounts for corporate team outings? We have around 50 people.',
                status: 'RESPONDED',
            },
        ],
    });

    // Create sample waivers
    await prisma.waiver.createMany({
        data: [
            {
                name: 'Rajesh Kumar',
                email: 'rajesh.kumar@example.com',
                phone: '+91 98765 43210',
                version: '1.0',
            },
            {
                name: 'Priya Sharma',
                email: 'priya.sharma@example.com',
                phone: '+91 98765 43211',
                version: '1.0',
            },
        ],
    });

    // Create admin user (password: admin123 - should be hashed in production)
    await prisma.adminUser.create({
        data: {
            name: 'Admin User',
            email: 'admin@ninjapark.com',
            password: '$2a$10$rKZLvVZQxQxQxQxQxQxQxO', // This is a placeholder - use bcrypt in production
            role: 'SUPER_ADMIN',
        },
    });

    console.log('✅ Sample data created successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
