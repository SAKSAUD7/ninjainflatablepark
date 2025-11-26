import { getStats, getGalleryItems, getReviews } from "../../lib/api";
import HomeContent from "./components/HomeContent";

export default async function Home() {
    const stats = await getStats();
    const gallery = await getGalleryItems();
    const reviews = await getReviews();

    return <HomeContent stats={stats} gallery={gallery} reviews={reviews} />;
}
