"use server";

import { fetchAPI } from "../lib/server-api";
import { requirePermission } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";
import { transformCmsItem } from "../lib/transformers";

export async function getTestimonials() {
    await requirePermission('cms', 'read');
    const res = await fetchAPI("/cms/testimonials/");
    if (!res || !res.ok) return [];
    const data = await res.json();
    return data.map(transformCmsItem);
}

export async function getTestimonial(id: string) {
    await requirePermission('cms', 'read');
    const res = await fetchAPI(`/cms/testimonials/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformCmsItem(data);
}

export async function createTestimonial(data: {
    name: string;
    role?: string;
    content: string;
    rating?: number;
    imageUrl?: string;
    type?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    active: boolean;
}) {
    await requirePermission('cms', 'write');

    const payload: any = { ...data };
    if (data.imageUrl) {
        payload.image_url = data.imageUrl;
        delete payload.imageUrl;
    }
    if (data.videoUrl) {
        payload.video_url = data.videoUrl;
        delete payload.videoUrl;
    }
    if (data.thumbnailUrl) {
        payload.thumbnail_url = data.thumbnailUrl;
        delete payload.thumbnailUrl;
    }

    const res = await fetchAPI("/cms/testimonials/", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!res || !res.ok) return { success: false };

    const testimonial = await res.json();

    await logActivity({
        action: 'CREATE',
        entity: 'TESTIMONIAL',
        entityId: testimonial.id.toString(),
        details: { after: testimonial }
    });

    revalidatePath('/admin/testimonials');
    return { success: true, testimonial: transformCmsItem(testimonial) };
}

export async function updateTestimonial(id: string, data: any) {
    await requirePermission('cms', 'write');

    const payload: any = { ...data };
    if (data.imageUrl) {
        payload.image_url = data.imageUrl;
        delete payload.imageUrl;
    }
    if (data.videoUrl) {
        payload.video_url = data.videoUrl;
        delete payload.videoUrl;
    }
    if (data.thumbnailUrl) {
        payload.thumbnail_url = data.thumbnailUrl;
        delete payload.thumbnailUrl;
    }

    const res = await fetchAPI(`/cms/testimonials/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'UPDATE',
        entity: 'TESTIMONIAL',
        entityId: id,
        details: { after: data }
    });

    revalidatePath('/admin/testimonials');
    return { success: true };
}

export async function deleteTestimonial(id: string) {
    await requirePermission('cms', 'delete');

    const res = await fetchAPI(`/cms/testimonials/${id}/`, {
        method: "DELETE"
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'DELETE',
        entity: 'TESTIMONIAL',
        entityId: id
    });

    revalidatePath('/admin/testimonials');
    return { success: true };
}
