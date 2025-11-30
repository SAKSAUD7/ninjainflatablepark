import { getStats, getGalleryItems } from "../../lib/api";
import { getPublicBanners, getGlobalSettings, getPublicActivities, getPublicTestimonials } from "../../lib/public-api";
import HomeContent from "./components/HomeContent";

export default async function Home() {
    const stats = await getStats();
    const gallery = await getGalleryItems();
    const banners = await getPublicBanners();
    const settings = await getGlobalSettings();
    const activities = await getPublicActivities();
    const testimonials = await getPublicTestimonials();

    // Transform testimonials to match Review interface
    const reviews = testimonials.map(t => ({
        id: t.id,
        url: t.videoUrl || '#',
        img: t.thumbnailUrl || t.imageUrl || '/images/hero-background.jpg'
    }));

    return <HomeContent stats={stats} gallery={gallery} banners={banners} reviews={reviews} settings={settings} activities={activities} />;
}
