"use client";

import { useEffect, useState } from "react";
import HomeContent from "./components/HomeContent";
import { API_ENDPOINTS } from "../../lib/api";

export default function Home() {
    const [data, setData] = useState<any>({
        stats: [],
        gallery: [],
        banners: [],
        reviews: [],
        settings: {},
        activities: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                // Fetch all data using centralized API endpoints
                const [bannersRes, activitiesRes, testimonialsRes, galleryRes] = await Promise.all([
                    fetch(API_ENDPOINTS.cms.banners),
                    fetch(API_ENDPOINTS.cms.activities),
                    fetch(API_ENDPOINTS.cms.testimonials),
                    fetch(API_ENDPOINTS.cms.gallery)
                ]);

                const banners = bannersRes.ok ? await bannersRes.json() : [];
                const activities = activitiesRes.ok ? await activitiesRes.json() : [];
                const testimonials = testimonialsRes.ok ? await testimonialsRes.json() : [];
                const gallery = galleryRes.ok ? await galleryRes.json() : [];

                // Transform data
                const stats = [
                    { id: "size", value: "20,000+", label: "Sq Ft of Fun", icon: "Zap" },
                    { id: "visitors", value: "5,000+", label: "Happy Jumpers", icon: "Users" },
                    { id: "attractions", value: `${activities.length}+`, label: "Attractions", icon: "Trophy" },
                    { id: "safety", value: "100%", label: "Safe & Secure", icon: "Shield" },
                ];

                const reviews = testimonials.filter((t: any) => t.active).slice(0, 6).map((t: any) => ({
                    id: t.id,
                    url: t.video_url || '#',
                    img: t.thumbnail_url || t.image_url || '/images/hero-background.jpg'
                }));

                const galleryItems = gallery.filter((g: any) => g.active).slice(0, 8).map((g: any) => ({
                    id: g.id,
                    src: g.image_url || '/images/hero-background.jpg',
                    title: g.title || '',
                    desc: g.category || ''
                }));

                setData({
                    stats,
                    gallery: galleryItems,
                    banners: banners.filter((b: any) => b.active),
                    reviews,
                    settings: {
                        parkName: "Ninja Inflatable Park",
                        contactPhone: "+91 98454 71611",
                        contactEmail: "info@ninjapark.com"
                    },
                    activities: activities.filter((a: any) => a.active)
                });
            } catch (error) {
                console.error("Failed to load homepage data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <HomeContent
            stats={data.stats}
            gallery={data.gallery}
            banners={data.banners}
            reviews={data.reviews}
            settings={data.settings}
            activities={data.activities}
        />
    );
}
