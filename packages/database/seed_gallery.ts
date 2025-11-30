import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedGallery() {
    console.log('🌱 Seeding gallery items...');

    // Clear existing gallery items
    await prisma.galleryItem.deleteMany({});

    const galleryItems = [
        {
            title: "Ninja Warrior Course",
            description: "Epic obstacle course action",
            imageUrl: "/images/uploads/img-1.jpg",
            active: true,
            order: 1
        },
        {
            title: "Giant Slides",
            description: "Thrilling slide adventures",
            imageUrl: "/images/uploads/img-2.jpg",
            active: true,
            order: 2
        },
        {
            title: "Wipeout Zone",
            description: "Challenge yourself!",
            imageUrl: "/images/uploads/img-3.jpg",
            active: true,
            order: 3
        },
        {
            title: "Bounce Arena",
            description: "Jump and flip fun",
            imageUrl: "/images/uploads/img-4.jpg",
            active: true,
            order: 4
        },
        {
            title: "Obstacle Challenge",
            description: "Race through obstacles",
            imageUrl: "/images/uploads/img-5.jpg",
            active: true,
            order: 5
        },
        {
            title: "Mega Slides",
            description: "Ultimate sliding experience",
            imageUrl: "/images/uploads/img-6.jpg",
            active: true,
            order: 6
        },
        {
            title: "Jump Zone",
            description: "Trampoline paradise",
            imageUrl: "/images/uploads/img-7.jpg",
            active: true,
            order: 7
        },
        {
            title: "Toddler Zone",
            description: "Safe fun for little ones",
            imageUrl: "/images/uploads/img-8.jpg",
            active: true,
            order: 8
        }
    ];

    for (const item of galleryItems) {
        await prisma.galleryItem.create({
            data: item
        });
    }

    console.log(`✅ Created ${galleryItems.length} gallery items`);
}

async function main() {
    try {
        await seedGallery();
        console.log('🎉 Gallery seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding gallery:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
