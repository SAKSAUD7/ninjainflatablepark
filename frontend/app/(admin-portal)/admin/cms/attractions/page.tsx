'use client';

import React, { useEffect, useState } from 'react';
import { getActivities, deleteActivity } from '@/app/actions/activities';
import { CollectionList } from '@/components/admin/cms/CollectionList';
import { schemas } from '@/lib/cms/schema';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AttractionsPage() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const data = await getActivities() as any[];
            setItems(data);
        } catch (error) {
            toast.error('Failed to load attractions');
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this attraction?')) return { success: false };

        const result = await deleteActivity(id);
        if (result.success) {
            setItems(prev => prev.filter(item => item.id !== id));
            toast.success('Attraction deleted');
        } else {
            toast.error('Failed to delete attraction');
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

    return (
        <div className="space-y-8">


            <CollectionList
                title="Attractions"
                description="Manage park attractions and activities."
                schema={schemas.activity}
                items={items}
                onDelete={handleDelete}
                basePath="/admin/cms/attractions"
                titleField="name"
                imageField="image_url"
                subtitleField="description"
            />
        </div>
    );
}
