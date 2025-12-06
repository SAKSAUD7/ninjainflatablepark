'use client';

import { CollectionList } from '@/components/admin/cms/CollectionList';
import { schemas } from '@/lib/cms/schema';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ContactMessagesPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadItems() {
            try {
                // Dynamically import API endpoints to avoid server/client mismatches if any
                const { API_ENDPOINTS } = await import('@/lib/api');
                const response = await fetch(API_ENDPOINTS.cms.contact_messages, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Important: Send cookies to backend
                });

                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Failed to fetch: ${response.status} ${text}`);
                }

                const data = await response.json();
                // Handle pagination standard DRF { count, next, previous, results }
                const results = Array.isArray(data) ? data : data.results || [];
                setItems(results);
                setError(null);
            } catch (err: any) {
                console.error('Failed to load contact messages', err);
                setError(err.message || 'Failed to load data');
            } finally {
                setLoading(false);
            }
        }
        loadItems();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg border border-red-200 m-8">
                <h3 className="font-bold">Error Loading Messages</h3>
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
                <p className="text-slate-500">View inquiries from the contact form</p>
            </div>

            <CollectionList
                schema={schemas.contact_message}
                items={items}
                basePath="/admin/cms/contact-messages"
                viewOnly={true}
                onDelete={async (id) => {
                    try {
                        // Dynamically import API to avoid any circular deps or server/client issues
                        const { deleteAPI, API_ENDPOINTS } = await import('@/lib/api');
                        // Backend requires credentials for delete
                        await deleteAPI(`${API_ENDPOINTS.cms.contact_messages}${id}/`, {
                            credentials: 'include'
                        });
                        return { success: true };
                    } catch (error) {
                        console.error("Delete failed", error);
                        return { success: false };
                    }
                }}
            />
        </div>
    );
}
