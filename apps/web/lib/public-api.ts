import { prisma } from "@repo/database";

// Public API functions - no authentication required

export async function getPublicBanners() {
    return await prisma.banner.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
    });
}

export async function getPublicTestimonials() {
    return await prisma.testimonial.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' },
        take: 6
    });
}

export async function getPublicActivities() {
    return await prisma.activity.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
    });
}

export async function getPublicFaqs() {
    return await prisma.faq.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
    });
}

export async function getGlobalSettings() {
    const settings = await prisma.globalSettings.findFirst();
    if (!settings) {
        // Return default settings if none exist
        return await prisma.globalSettings.create({
            data: {
                parkName: "Ninja Inflatable Park",
                contactPhone: "+91 98454 71611",
                contactEmail: "info@ninjapark.com",
                address: "Ground Floor, Gopalan Innovation Mall, Bannerghatta Main Rd, JP Nagar 3rd Phase, Bengaluru, Karnataka 560076",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750939864231!2d77.5986873750756!3d12.92372298738734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1580228d7a45%3A0x644e04369062342c!2sGopalan%20Innovation%20Mall!5e0!3m2!1sen!2sin!4v1709901234567!5m2!1sen!2sin",
                openingHours: JSON.stringify({
                    weekdays: "11:00 AM - 10:00 PM",
                    weekends: "10:00 AM - 11:00 PM"
                }),
                aboutText: "Ninja Inflatable Park is India's largest inflatable adventure park, offering a unique blend of fun, fitness, and thrill. With over 20,000 sq ft of inflatable obstacles, slides, and challenges, we provide an unforgettable experience for all ages."
            }
        });
    }
    return settings;
}

export async function getPublicSocialLinks() {
    return await prisma.socialLink.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
    });
}
