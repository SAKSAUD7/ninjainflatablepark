import React from 'react';
import HomeContent from "./components/HomeContent";
import { getBanners } from "../actions/banners";
import { getActivities } from "../actions/activities";
import { getTestimonials } from "../actions/testimonials";
import { getGalleryItems } from "../actions/gallery";
import { getPageSections } from "../actions/page-sections";
import { getInstagramReels } from "../actions/instagram-reels";
import { getStatCards } from "../actions/stat-cards";
import { getSettings } from "../actions/settings";

export const dynamic = 'force-dynamic';

export default async function Home() {
    // Fetch all data in parallel
    const [
        banners,
        activities,
        testimonials,
        gallery,
        sections,
        reels,
        statCards,
        settingsData
    ] = await Promise.all([
        getBanners(),
        getActivities(),
        getTestimonials(),
        getGalleryItems(),
        getPageSections('home'),
        getInstagramReels(),
        getStatCards('home'),
        getSettings()
    ]) as [any[], any[], any[], any[], any[], any[], any[], any];

    // Extract page sections
    const heroSection = sections.find((s: any) => s.section_key === 'hero');
    const aboutSection = sections.find((s: any) => s.section_key === 'about');

    // Transform stats
    const stats = statCards.length > 0 ? statCards.map((s: any) => ({
        id: s.id,
        value: s.value,
        label: s.label,
        icon: s.icon || 'Zap'
    })) : [
        { id: "size", value: "20,000+", label: "Sq Ft of Fun", icon: "Zap" },
        { id: "visitors", value: "5,000+", label: "Happy Jumpers", icon: "Users" },
        { id: "attractions", value: `${activities.length}+`, label: "Attractions", icon: "Trophy" },
        { id: "safety", value: "100%", label: "Safe & Secure", icon: "Shield" },
    ];

    // Transform reviews (Reels > Testimonials)
    const displayReviews = reels.length > 0
        ? reels.filter((r: any) => r.active).map((r: any) => ({
            id: r.id,
            url: r.url,
            img: r.thumbnail_url || '/park-slides-action.jpg'
        }))
        : testimonials.filter((t: any) => t.active).slice(0, 6).map((t: any) => ({
            id: t.id,
            url: t.video_url || '#',
            img: t.thumbnail_url || t.image_url || '/images/hero-background.jpg'
        }));

    // Transform gallery
    const galleryItems = gallery.filter((g: any) => g.active).slice(0, 8).map((g: any) => ({
        id: g.id,
        src: g.image_url || '/images/hero-background.jpg',
        title: g.title || '',
        desc: g.category || ''
    }));

    // Prepare data for HomeContent
    const heroData = heroSection ? {
        title: heroSection.title,
        subtitle: heroSection.content,
        image: heroSection.image_url
    } : undefined;

    const aboutData = aboutSection ? {
        title: aboutSection.title,
        content: aboutSection.content,
        image: aboutSection.image_url
    } : undefined;

    const settings = settingsData ? {
        parkName: settingsData.park_name || "Ninja Inflatable Park",
        contactPhone: settingsData.contact_phone || "+91 98454 71611",
        contactEmail: settingsData.contact_email || "info@ninjapark.com",
        ...settingsData
    } : {
        parkName: "Ninja Inflatable Park",
        contactPhone: "+91 98454 71611",
        contactEmail: "info@ninjapark.com"
    };

    return (
        <HomeContent
            stats={stats}
            gallery={galleryItems}
            banners={banners.filter((b: any) => b.active)}
            reviews={displayReviews}
            settings={settings}
            activities={activities.filter((a: any) => a.active)}
            hero={heroData}
            about={aboutData}
        />
    );
}
