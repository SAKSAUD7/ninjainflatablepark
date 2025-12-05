'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI, postAPI, putAPI, deleteAPI, API_ENDPOINTS } from '@/lib/api';

const ENDPOINT = API_ENDPOINTS.cms.testimonials;

export async function getTestimonials() {
    try {
        return await fetchAPI(ENDPOINT, { cache: 'no-store' });
    } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        return [];
    }
}

export async function createTestimonial(data: any) {
    try {
        const result = await postAPI(ENDPOINT, data);
        revalidatePath('/admin/cms/home');
        return { success: true, item: result };
    } catch (error) {
        console.error('Failed to create testimonial:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to create testimonial' };
    }
}

export async function updateTestimonial(id: string, data: any) {
    try {
        const result = await putAPI(`${ENDPOINT}${id}/`, data);
        revalidatePath('/admin/cms/home');
        return { success: true, item: result };
    } catch (error) {
        console.error(`Failed to update testimonial ${id}:`, error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to update testimonial' };
    }
}

export async function deleteTestimonial(id: string) {
    try {
        await deleteAPI(`${ENDPOINT}${id}/`);
        revalidatePath('/admin/cms/home');
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete testimonial ${id}:`, error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to delete testimonial' };
    }
}
