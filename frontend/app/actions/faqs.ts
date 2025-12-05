'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI, postAPI, putAPI, deleteAPI, API_ENDPOINTS } from '@/lib/api';

const ENDPOINT = API_ENDPOINTS.cms.faqs;

export async function getFaqs() {
    try {
        return await fetchAPI(ENDPOINT, { cache: 'no-store' });
    } catch (error) {
        return [];
    }
}
