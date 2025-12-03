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
