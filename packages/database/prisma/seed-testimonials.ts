import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTestimonials() {
    console.log('🌱 Seeding testimonials...');

    const testimonials = [
        {
            name: "Priya Sharma",
            content: "Amazing experience! My kids had the time of their lives. The ninja course was challenging and so much fun. Staff was super friendly and helpful. Will definitely come back!",
            rating: 5,
            active: true,
            imageUrl: null,
            role: "Parent"
        },
        {
            name: "Rajesh Kumar",
            content: "Best birthday party venue ever! The team helped organize everything perfectly. Kids were entertained for hours. The party package was worth every penny!",
            rating: 5,
            active: true,
            imageUrl: null,
            role: "Birthday Party Host"
        },
        {
            name: "Ananya Reddy",
            content: "Such a unique concept in Bangalore! The inflatable obstacles are well-maintained and safe. My 7-year-old daughter keeps asking when we can go back. Highly recommend!",
            rating: 5,
            active: true,
            imageUrl: null,
            role: "Happy Customer"
        },
        {
            name: "Vikram Patel",
            content: "Brought my corporate team for a fun outing. Everyone loved it! Great for team building and stress relief. The café has good snacks too. Will book again for our next event.",
            rating: 5,
            active: true,
            imageUrl: null,
            role: "Corporate Team Lead"
        },
        {
            name: "Sneha Iyer",
            content: "The giant slides are incredible! My kids aged 5 and 9 both had a blast. Very clean facility and the safety measures are impressive. Worth the drive from the city!",
            rating: 5,
            active: true,
            imageUrl: null,
            role: "Parent of Two"
        },
        {
            name: "Arjun Menon",
            content: "Fantastic place for kids and adults alike! I had as much fun as my children. The wipeout zone is challenging even for adults. Great value for money!",
            rating: 5,
            active: true,
            imageUrl: null,
            role: "Adventure Enthusiast"
        }
    ];

    for (const testimonial of testimonials) {
        await prisma.testimonial.create({
            data: testimonial
        });
    }

    console.log(`✅ Created ${testimonials.length} testimonials`);
}

async function main() {
    try {
        await seedTestimonials();
        console.log('🎉 Seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
