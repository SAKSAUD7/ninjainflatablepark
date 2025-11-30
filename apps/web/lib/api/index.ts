import { prisma } from "@repo/database";
import { Stat, GalleryItem } from "./types";
import { unstable_noStore as noStore } from "next/cache";

export const getStats = async (): Promise<Stat[]> => {
    noStore();
    const [customerCount, activityCount] = await Promise.all([
        prisma.customer.count(),
        prisma.activity.count({ where: { active: true } })
    ]);

    return [
        {
            id: "size",
            value: "20,000+",
            label: "Sq Ft of Fun",
            icon: "Zap",
        },
        {
            id: "visitors",
            value: `${(customerCount + 5000).toLocaleString()}+`, // Base offset for marketing
            label: "Happy Jumpers",
            icon: "Users",
        },
        {
            id: "attractions",
            value: `${activityCount}+`,
            label: "Attractions",
            icon: "Trophy",
        },
        {
            id: "safety",
            value: "100%",
            label: "Safe & Secure",
            icon: "Shield",
        },
    ];
};

export const getGalleryItems = async (): Promise<GalleryItem[]> => {
    noStore();
    const items = await prisma.galleryItem.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
        take: 8
    });

    return items.map(item => ({
        id: item.id,
        src: item.imageUrl,
        title: item.title || '',
        desc: item.category || ''
    }));
};
