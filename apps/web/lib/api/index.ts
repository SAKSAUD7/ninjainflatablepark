import { statsData } from "../../data/stats";
import { galleryData } from "../../data/gallery";
import { reviewsData } from "../../data/reviews";
import { Stat, GalleryItem, Review } from "./types";

export const getStats = async (): Promise<Stat[]> => {
    return statsData;
};

export const getGalleryItems = async (): Promise<GalleryItem[]> => {
    return galleryData;
};

export const getReviews = async (): Promise<Review[]> => {
    return reviewsData;
};
