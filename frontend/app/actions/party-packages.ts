'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI, postAPI, putAPI, deleteAPI, API_ENDPOINTS } from '@/lib/api';

const ENDPOINT = API_ENDPOINTS.cms.party_packages;

export async function getPartyPackages() {
    try {
        return await fetchAPI(ENDPOINT, { cache: 'no-store' });
    } catch (error) {
        return [];
    }
}

export async function getPartyPackage(id: string) {
    try {
        return await fetchAPI(`${ENDPOINT}${id}/`, { cache: 'no-store' });
    } catch (error) {
        return null;
    }
}

export async function createPartyPackage(data: any) {
    try {
        const result = await postAPI(ENDPOINT, data);
        revalidatePath('/admin/cms/party-packages');
        return { success: true, item: result };
    } catch (error) {
        return { success: false, error: 'Failed to create party package' };
    }
}

export async function updatePartyPackage(id: string, data: any) {
    try {
        const result = await putAPI(`${ENDPOINT}${id}/`, data);
        revalidatePath('/admin/cms/party-packages');
        return { success: true, item: result };
    } catch (error) {
        return { success: false, error: 'Failed to update party package' };
    }
}

export async function deletePartyPackage(id: string) {
    try {
        await deleteAPI(`${ENDPOINT}${id}/`);
        revalidatePath('/admin/cms/party-packages');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete party package' };
    }
}
