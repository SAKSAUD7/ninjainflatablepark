import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export function getAuthHeader(): Record<string, string> {
    const token = cookies().get("admin_token")?.value;
    return token ? { "Authorization": `Bearer ${token}` } : {};
}

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...getAuthHeader(),
    };

    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        cache: "no-store",
    });

    if (res.status === 401) {
        return null;
    }

    return res;
}

export async function postAPI(endpoint: string, data: any) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...getAuthHeader(),
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (res.status === 401) return null;
    return res.json();
}

export async function putAPI(endpoint: string, data: any) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...getAuthHeader(),
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (res.status === 401) return null;
    return res.json();
}

export async function deleteAPI(endpoint: string) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...getAuthHeader(),
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers,
        cache: "no-store",
    });

    if (res.status === 401) return null;
    return res.status === 204;
}
