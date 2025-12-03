"use server";

import { fetchAPI } from "../lib/server-api";
import { requirePermission } from "../lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    await requirePermission('users', 'read');
    const res = await fetchAPI("/core/users/");
    if (!res || !res.ok) return [];
    return await res.json();
}

export async function getUser(id: string) {
    await requirePermission('users', 'read');
    const res = await fetchAPI(`/core/users/${id}/`);
    if (!res || !res.ok) return null;
    return await res.json();
}

export async function updateUser(id: string, data: {
    name?: string;
    email?: string;
    role?: string;
    is_active?: boolean;
}) {
    await requirePermission('users', 'write');

    const res = await fetchAPI(`/core/users/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });

    if (!res || !res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update user");
    }

    revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
    await requirePermission('users', 'delete');

    const res = await fetchAPI(`/core/users/${id}/`, {
        method: "DELETE"
    });

    if (!res || !res.ok) {
        throw new Error("Failed to delete user");
    }

    revalidatePath("/admin/users");
}
