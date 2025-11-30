import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedBanners() {
    console.log('🌱 Seeding banners...');

    const banners = [
        {
            title: "Welcome to Ninja Inflatable Park - Unleash Your Inner Ninja!",
            imageUrl: "/images/hero-background.jpg",
            link: "/booking",
            active: true,
            order: 1
        },
        {
            title: "Birthday Parties & Events - Make Your Celebration Unforgettable",
            imageUrl: "/images/uploads/img-10.jpg",
            link: "/parties",
            active: true,
            order: 2
        },
        {
            title: "New Attractions Now Open - More Fun, More Adventure!",
            imageUrl: "/images/uploads/img-1.jpg",
            link: "/attractions",
            active: true,
            order: 3
        }
    ];

    // Clear existing banners first
    await prisma.banner.deleteMany({});

    for (const banner of banners) {
        await prisma.banner.create({
            data: banner
        });
    }

    console.log(`✅ Created ${banners.length} banners`);
}

async function main() {
    try {
        await seedBanners();
        console.log('🎉 Banner seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding banners:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
