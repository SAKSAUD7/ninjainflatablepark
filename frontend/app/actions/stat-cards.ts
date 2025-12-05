'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI, postAPI, putAPI, deleteAPI, API_ENDPOINTS } from '@/lib/api';

const ENDPOINT = API_ENDPOINTS.cms.stat_cards; // Need to ensure this exists in lib/api.ts

export async function getStatCards(page?: string) {
    try {
        const url = page ? `${ENDPOINT}?page=${page}` : ENDPOINT;
        return await fetchAPI(url, { cache: 'no-store' });
    } catch (error) {
        return [];
    }
}

// ... create, update, delete actions
