import { getStats, getGalleryItems } from "../../lib/api";
import { getPublicBanners, getGlobalSettings } from "../../lib/public-api";
import HomeContent from "./components/HomeContent";
import { reviewsData } from "../../data/reviews";

export default async function Home() {
    const stats = await getStats();
    const gallery = await getGalleryItems();
    const banners = await getPublicBanners();
    const settings = await getGlobalSettings();

    return <HomeContent stats={stats} gallery={gallery} banners={banners} reviews={reviewsData} settings={settings} />;
}
