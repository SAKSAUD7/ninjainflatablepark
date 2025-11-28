import { getStats, getGalleryItems } from "../../lib/api";
import { getPublicBanners, getPublicTestimonials } from "../../lib/public-api";
import HomeContent from "./components/HomeContent";

export default async function Home() {
    const stats = await getStats();
    const gallery = await getGalleryItems();
    const banners = await getPublicBanners();
    const testimonials = await getPublicTestimonials();

    return <HomeContent stats={stats} gallery={gallery} banners={banners} testimonials={testimonials} />;
}
