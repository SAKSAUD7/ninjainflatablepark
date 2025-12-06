'use client';

import React, { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { CMSForm } from '@/components/admin/cms/CMSForm';
import { schemas } from '@/lib/cms/schema';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Reusing generic fetch since we haven't exported specific getContactMessage action yet
// Client-side fetcher removed effectively by not using it


export default function ViewContactMessagePage({ params }: { params: { id: string } }) {
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadItem() {
            try {
                const { API_ENDPOINTS } = await import('@/lib/api');
                const response = await fetch(`${API_ENDPOINTS.cms.contact_messages}${params.id}/`, {
                    credentials: 'include',
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setItem(data);
                } else {
                    toast.error('Message not found');
                }
            } catch (error) {
                toast.error('Failed to load message');
            } finally {
                setLoading(false);
            }
        }
        loadItem();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!item) {
        return <div>Message not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Contact Message Details</h1>
                <p className="text-slate-500">View message content</p>
            </div>

            <CMSForm
                schema={schemas.contact_message}
                initialData={item}
                onSubmit={async (data) => {
                    toast.success("Message status updated (Simulation)");
                    // To implement update logic properly we'd need an updateContactMessage action
                    return { success: true };
                }}
                submitLabel="Update Status"
                backUrl="/admin/cms/contact-messages"
            />
        </div>
    );
}
