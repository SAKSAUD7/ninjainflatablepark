'use client';

import React, { useEffect, useState } from 'react';
import { getPricingPlans, deletePricingPlan } from '@/app/actions/pricing-plans';
import { CollectionList } from '@/components/admin/cms/CollectionList';
import { schemas } from '@/lib/cms/schema';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PricingPlansPage() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const data = await getPricingPlans() as any[];
            setItems(data);
        } catch (error) {
            toast.error('Failed to load pricing plans');
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this plan?')) return { success: false };

        const result = await deletePricingPlan(id);
        if (result.success) {
            setItems(prev => prev.filter(item => item.id !== id));
            toast.success('Plan deleted');
        } else {
            toast.error('Failed to delete pricing plan');
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
                title="Pricing Plans"
                description="Manage session and party pricing options."
                schema={schemas.pricing_plan}
                items={items}
                onDelete={handleDelete}
                basePath="/admin/cms/pricing"
                titleField="name"
                subtitleField="type"
            />
        </div>
    );
}
