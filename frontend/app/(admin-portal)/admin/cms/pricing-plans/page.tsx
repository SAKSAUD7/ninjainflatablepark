import React from 'react';
import { getPricingPlans, deletePricingPlan } from '../../../../actions/pricing-plans';
import { CollectionList } from '../../../../components/admin/cms/CollectionList';
import { schemas } from '../../../../lib/cms/schema';

export default async function PricingPlansPage() {
    const items = await getPricingPlans();

    return (
        <CollectionList
            title="Pricing Plans"
            description="Manage session and party pricing plans"
            items={items}
            schema={schemas.pricing_plan}
            basePath="/admin/cms/pricing-plans"
            onDelete={deletePricingPlan}
        />
    );
}
