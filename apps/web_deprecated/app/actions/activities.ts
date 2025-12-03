"use server";

import { fetchAPI } from "../lib/server-api";
import { requirePermission } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

function transformActivity(a: any) {
    if (!a) return null;
    return {
        ...a,
        imageUrl: a.image_url,
        createdAt: a.created_at,
        updatedAt: a.updated_at
    };
}

export async function getActivities() {
    await requirePermission('cms', 'read');
    const res = await fetchAPI("/cms/activities/");
    if (!res || !res.ok) return [];
    const data = await res.json();
    return data.map(transformActivity);
}

export async function getActivity(id: string) {
    await requirePermission('cms', 'read');
    const res = await fetchAPI(`/cms/activities/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformActivity(data);
}

export async function createActivity(data: {
    name: string;
    description: string;
    imageUrl: string;
    active: boolean;
    order: number;
}) {
    await requirePermission('cms', 'write');

    const payload = {
        name: data.name,
        description: data.description,
        image_url: data.imageUrl,
        active: data.active,
        order: data.order
    };

    const res = await fetchAPI("/cms/activities/", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!res || !res.ok) return { success: false };

    const activity = await res.json();

    await logActivity({
        action: 'CREATE',
        entity: 'ACTIVITY',
        entityId: activity.id.toString(),
        details: { after: activity }
    });

    revalidatePath('/admin/activities');
    return { success: true, activity: transformActivity(activity) };
}

export async function updateActivity(id: string, data: {
    name?: string;
    description?: string;
    imageUrl?: string;
    active?: boolean;
    order?: number;
}) {
    await requirePermission('cms', 'write');

    const payload: any = { ...data };
    if (data.imageUrl) {
        payload.image_url = data.imageUrl;
        delete payload.imageUrl;
    }

    const res = await fetchAPI(`/cms/activities/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'UPDATE',
        entity: 'ACTIVITY',
        entityId: id,
        details: { after: data }
    });

    revalidatePath('/admin/activities');
    return { success: true };
}

export async function deleteActivity(id: string) {
    await requirePermission('cms', 'delete');

    const res = await fetchAPI(`/cms/activities/${id}/`, {
        method: "DELETE"
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'DELETE',
        entity: 'ACTIVITY',
        entityId: id
    });

    revalidatePath('/admin/activities');
    return { success: true };
}
