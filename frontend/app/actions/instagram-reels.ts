"use server";

import { fetchAPI } from "../lib/server-api";
import { requirePermission } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";
import { transformCmsItem } from "../lib/transformers";

export async function getInstagramReels() {
    await requirePermission('cms', 'read');
    const res = await fetchAPI("/cms/instagram-reels/");
    if (!res || !res.ok) return [];
    const data = await res.json();
    return data.map(transformCmsItem);
}

export async function getInstagramReel(id: string) {
    await requirePermission('cms', 'read');
    const res = await fetchAPI(`/cms/instagram-reels/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformCmsItem(data);
}

export async function createInstagramReel(data: {
    title: string;
    reelUrl: string;
    thumbnailUrl: string;
    active: boolean;
    order: number;
}) {
    await requirePermission('cms', 'write');

    const payload = {
        title: data.title,
        reel_url: data.reelUrl,
        thumbnail_url: data.thumbnailUrl,
        active: data.active,
        order: data.order
    };

    const res = await fetchAPI("/cms/instagram-reels/", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!res || !res.ok) return { success: false };

    const item = await res.json();

    await logActivity({
        action: 'CREATE',
        entity: 'INSTAGRAM_REEL',
        entityId: item.id.toString(),
        details: { after: item }
    });

    revalidatePath('/admin/instagram-reels');
    return { success: true, item: transformCmsItem(item) };
}

export async function updateInstagramReel(id: string, data: Partial<{
    title?: string;
    reelUrl?: string;
    thumbnailUrl?: string;
    active?: boolean;
    order?: number;
}>) {
    await requirePermission('cms', 'write');

    const payload: any = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.reelUrl !== undefined) payload.reel_url = data.reelUrl;
    if (data.thumbnailUrl !== undefined) payload.thumbnail_url = data.thumbnailUrl;
    if (data.active !== undefined) payload.active = data.active;
    if (data.order !== undefined) payload.order = data.order;

    const res = await fetchAPI(`/cms/instagram-reels/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'UPDATE',
        entity: 'INSTAGRAM_REEL',
        entityId: id,
        details: { after: data }
    });

    revalidatePath('/admin/instagram-reels');
    return { success: true };
}

export async function deleteInstagramReel(id: string) {
    await requirePermission('cms', 'delete');

    const res = await fetchAPI(`/cms/instagram-reels/${id}/`, {
        method: "DELETE"
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'DELETE',
        entity: 'INSTAGRAM_REEL',
        entityId: id
    });

    revalidatePath('/admin/instagram-reels');
    return { success: true };
}
