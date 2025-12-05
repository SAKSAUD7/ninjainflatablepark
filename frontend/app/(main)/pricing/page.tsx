import React from 'react';
import PricingContent from "./components/PricingContent";
import { getPricingPlans } from "../../actions/pricing-plans";
import { getSettings } from "../../actions/settings";

export const dynamic = 'force-dynamic';

export default async function Pricing() {
    const [
        plans,
        settings
    ] = await Promise.all([
        getPricingPlans(),
        getSettings()
    ]) as [any[], any];

    return (
        <PricingContent
            plans={plans}
            settings={settings}
        />
    );
}
