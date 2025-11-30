import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateTestimonialsWithRealUrls() {
    console.log('🎥 Updating testimonials with real Instagram/YouTube URLs...');

    // Clear existing testimonials and create new ones with actual video URLs
    await prisma.testimonial.deleteMany({});

    const testimonialsWithVideos = [
        {
            name: "Ninja Park Adventure",
            content: "Amazing ninja warrior experience! Check out the action-packed fun at our park.",
            rating: 5,
            active: true,
            videoUrl: "https://www.youtube.com/watch?v=HyiotrTUL44",
            thumbnailUrl: "/images/uploads/img-1.jpg",
            role: "Featured Video"
        },
        {
            name: "Instagram Reel 1",
            content: "Experience the thrill! Watch our latest Instagram reel showcasing the best moments.",
            rating: 5,
            active: true,
            videoUrl: "https://www.instagram.com/reel/DRSCTjdAZB8/",
            thumbnailUrl: "/images/uploads/img-2.jpg",
            role: "Social Media"
        },
        {
            name: "Instagram Reel 2",
            content: "More epic moments from Ninja Inflatable Park! Don't miss out on the fun.",
            rating: 5,
            active: true,
            videoUrl: "https://www.instagram.com/reel/DRhcG8oEfGl/",
            thumbnailUrl: "/images/uploads/img-3.jpg",
            role: "Social Media"
        },
        {
            name: "Instagram Reel 3",
            content: "Jump, slide, and conquer! See what makes our park the best in Bangalore.",
            rating: 5,
            active: true,
            videoUrl: "https://www.instagram.com/reel/DRjQQSNkZf_/",
            thumbnailUrl: "/images/uploads/img-4.jpg",
            role: "Social Media"
        },
        {
            name: "Instagram Post",
            content: "Check out our latest Instagram post featuring happy customers and amazing moments!",
            rating: 5,
            active: true,
            videoUrl: "https://www.instagram.com/p/DRlwlsfCa-x/",
            thumbnailUrl: "/images/uploads/img-5.jpg",
            role: "Social Media"
        }
    ];

    for (const testimonial of testimonialsWithVideos) {
        await prisma.testimonial.create({
            data: testimonial
        });
    }

    console.log(`✅ Created ${testimonialsWithVideos.length} testimonials with real video URLs`);
    console.log('📝 Video URLs added:');
    testimonialsWithVideos.forEach(t => console.log(`   - ${t.videoUrl}`));
}

async function main() {
    try {
        await updateTestimonialsWithRealUrls();
        console.log('🎉 Testimonials updated successfully with real URLs!');
    } catch (error) {
        console.error('❌ Error updating testimonials:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main();
