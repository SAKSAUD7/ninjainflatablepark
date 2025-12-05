'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI, postAPI, putAPI, deleteAPI, API_ENDPOINTS } from '@/lib/api';

const ENDPOINT = API_ENDPOINTS.cms.pricing_plans;

export async function getPricingPlans() {
    try {
        return await fetchAPI(ENDPOINT, { cache: 'no-store' });
    } catch (error) {
        return [];
    }
}

export async function getPricingPlan(id: string) {
    try {
        return await fetchAPI(`${ENDPOINT}${id}/`, { cache: 'no-store' });
    } catch (error) {
        return null;
    }
}

export async function createPricingPlan(data: any) {
    try {
        const result = await postAPI(ENDPOINT, data);
        revalidatePath('/admin/cms/pricing');
        return { success: true, item: result };
    } catch (error) {
        return { success: false, error: 'Failed to create pricing plan' };
    }
}

export async function updatePricingPlan(id: string, data: any) {
    try {
        const result = await putAPI(`${ENDPOINT}${id}/`, data);
        revalidatePath('/admin/cms/pricing');
        return { success: true, item: result };
    } catch (error) {
        return { success: false, error: 'Failed to update pricing plan' };
    }
}

export async function deletePricingPlan(id: string) {
    try {
        await deleteAPI(`${ENDPOINT}${id}/`);
        revalidatePath('/admin/cms/pricing');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete pricing plan' };
    }
}
