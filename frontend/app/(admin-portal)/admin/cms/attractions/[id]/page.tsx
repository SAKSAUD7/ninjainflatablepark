'use client';

import React, { useEffect, useState } from 'react';
import { getActivity, updateActivity } from '@/app/actions/activities';
import { CMSForm } from '@/components/admin/cms/CMSForm';
import { schemas } from '@/lib/cms/schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function EditAttractionPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, [params.id]);

    async function loadData() {
        try {
            const data = await getActivity(params.id);
            if (data) {
                setItem(data);
            } else {
                toast.error('Attraction not found');
                router.push('/admin/cms/attractions');
            }
        } catch (error) {
            toast.error('Failed to load attraction');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (data: any) => {
        const result = await updateActivity(params.id, data);
        if (result.success) {
            toast.success('Attraction updated successfully');
            router.push('/admin/cms/attractions');
        } else {
            toast.error('Failed to update attraction');
        }
        return result;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!item) return null;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Edit Attraction</h1>
                <p className="text-slate-500">Update attraction details.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <CMSForm
                    schema={schemas.activity}
                    initialData={item}
                    onSubmit={handleSubmit}
                    submitLabel="Update Attraction"
                />
            </div>
        </div>
    );
}
