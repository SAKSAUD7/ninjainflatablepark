"use server";

import { fetchAPI } from "../lib/server-api";
import { requirePermission } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";
import { transformCmsItem } from "../lib/transformers";

export async function getPageSections(page: string) {
    await requirePermission('cms', 'read');
    if (!page) return []; // Fail safe or throw error
    const endpoint = `/cms/page-sections/?page=${page}`;
    const res = await fetchAPI(endpoint);
    if (!res || !res.ok) return [];
    const data = await res.json();
    return data.map(transformCmsItem);
}

export async function getPageSection(id: string) {
    await requirePermission('cms', 'read');
    const res = await fetchAPI(`/cms/page-sections/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformCmsItem(data);
}

export async function createPageSection(data: any) {
    await requirePermission('cms', 'write');

    const res = await fetchAPI("/cms/page-sections/", {
        method: "POST",
        body: JSON.stringify(data)
    });

    if (!res || !res.ok) return { success: false };

    const item = await res.json();

    await logActivity({
        action: 'CREATE',
        entity: 'PAGE_SECTION',
        entityId: item.id.toString(),
        details: { after: item }
    });

    revalidatePath('/admin/cms/page-sections');
    return { success: true, item: transformCmsItem(item) };
}

export async function updatePageSection(id: string, data: any) {
    await requirePermission('cms', 'write');

    const res = await fetchAPI(`/cms/page-sections/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });

    if (!res || !res.ok) return { success: false };

    const item = await res.json();

    await logActivity({
        action: 'UPDATE',
        entity: 'PAGE_SECTION',
        entityId: id,
        details: { after: item }
    });

    revalidatePath('/admin/cms/page-sections');
    return { success: true, item: transformCmsItem(item) };
}

export async function deletePageSection(id: string) {
    await requirePermission('cms', 'delete');

    const res = await fetchAPI(`/cms/page-sections/${id}/`, {
        method: "DELETE"
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'DELETE',
        entity: 'PAGE_SECTION',
        entityId: id
    });

    revalidatePath('/admin/cms/page-sections');
    return { success: true };
}
