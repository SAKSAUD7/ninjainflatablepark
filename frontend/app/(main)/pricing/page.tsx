import React from 'react';
import PricingContent from "./components/PricingContent";
import { getPricingPlans } from "../../actions/pricing-plans";
import { getPageSections } from "../../actions/page-sections";
import { getSettings } from "../../actions/settings";

export const dynamic = 'force-dynamic';

export default async function Pricing() {
    const [
        plans,
        pageSections,
        settings
    ] = await Promise.all([
        getPricingPlans(),
        getPageSections('pricing'),
        getSettings()
    ]) as [any[], any[], any];

    const heroSection = pageSections.find((s: any) => s.section_key === 'hero');

    const hero = heroSection ? {
        title: heroSection.title,
        subtitle: heroSection.content,
        image: heroSection.image_url
    } : undefined;

    return (
        <PricingContent
            plans={plans}
            hero={hero}
            settings={settings}
        />
    );
}
