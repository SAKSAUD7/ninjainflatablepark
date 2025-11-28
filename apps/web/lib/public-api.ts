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
