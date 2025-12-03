"use server";

import { fetchAPI } from "../lib/server-api";
import { requirePermission } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";
import { transformCmsItem } from "../lib/transformers";

export async function getFaqs() {
    await requirePermission('cms', 'read');
    const res = await fetchAPI("/cms/faqs/");
    if (!res || !res.ok) return [];
    const data = await res.json();
    return data.map(transformCmsItem);
}

export async function getFaq(id: string) {
    await requirePermission('cms', 'read');
    const res = await fetchAPI(`/cms/faqs/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformCmsItem(data);
}

export async function createFaq(data: {
    question: string;
    answer: string;
    category?: string;
    active: boolean;
    order: number;
}) {
    await requirePermission('cms', 'write');

    const res = await fetchAPI("/cms/faqs/", {
        method: "POST",
        body: JSON.stringify(data)
    });

    if (!res || !res.ok) return { success: false };

    const faq = await res.json();

    await logActivity({
        action: 'CREATE',
        entity: 'FAQ',
        entityId: faq.id.toString(),
        details: { after: faq }
    });

    revalidatePath('/admin/faqs');
    return { success: true, faq: transformCmsItem(faq) };
}

export async function updateFaq(id: string, data: {
    question?: string;
    answer?: string;
    category?: string;
    active?: boolean;
    order?: number;
}) {
    await requirePermission('cms', 'write');

    const res = await fetchAPI(`/cms/faqs/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'UPDATE',
        entity: 'FAQ',
        entityId: id,
        details: { after: data }
    });

    revalidatePath('/admin/faqs');
    return { success: true };
}

export async function deleteFaq(id: string) {
    await requirePermission('cms', 'delete');

    const res = await fetchAPI(`/cms/faqs/${id}/`, {
        method: "DELETE"
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'DELETE',
        entity: 'FAQ',
        entityId: id
    });

    revalidatePath('/admin/faqs');
    return { success: true };
}
