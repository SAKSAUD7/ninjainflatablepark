'use server';

import { fetchAPI, postAPI, API_ENDPOINTS } from '@/lib/api';

const ENDPOINT = API_ENDPOINTS.cms.contact_messages;

export async function createContactMessage(data: any) {
    try {
        const result = await postAPI(ENDPOINT, data);
        return { success: true, item: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Failed to send message' };
    }
}

export async function getContactMessages() {
    console.log("getContactMessages: Starting fetch...");
    try {
        const { cookies } = await import("next/headers");
        const cookieStore = cookies();
        const allCookies = cookieStore.getAll();
        console.log("getContactMessages: Cookies found:", allCookies.length);

        const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ');

        // Use custom fetch to get full response for debugging
        const response = await fetch(ENDPOINT, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieHeader
            }
        });

        console.log("getContactMessages: Backend Response Status:", response.status);

        if (!response.ok) {
            const text = await response.text();
            console.error("getContactMessages: Backend Error Body:", text);
            throw new Error(`Backend responded with ${response.status}: ${text}`);
        }

        const data = await response.json();
        console.log("getContactMessages: Data received count:", Array.isArray(data) ? data.length : 'Not array');
        if (data.results) return data.results; // Handle pagination if DRF returns { results: [] }
        return data;

    } catch (error) {
        console.error("getContactMessages: FATAL ERROR:", error);
        throw error;
    }
}
