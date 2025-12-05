import React from 'react';
import { getPricingPlans } from '@/app/actions/pricing-plans';
import { getPageSections } from '@/app/actions/page-sections';
import { getPartyPackages } from '@/app/actions/party-packages';
import { getGroupPackages } from '@/app/actions/group-packages';
import { PricingPlansManager } from '@/components/admin/cms/pricing/PricingPlansManager';
import { PartyPackagesManager } from '@/components/admin/cms/pricing/PartyPackagesManager';
import { GroupPackagesManager } from '@/components/admin/cms/pricing/GroupPackagesManager';
import { CMSBackLink } from '@/components/admin/cms/CMSBackLink';

export default async function PricingAdminPage() {
    // Fetch all data in parallel
    const [plans, partyPackages, groupPackages] = await Promise.all([
        getPageSections('pricing'),
        getPartyPackages(),
        getGroupPackages()
    ]) as [any[], any[], any[]];

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            <CMSBackLink />
            <div>
                {/* Group Packages Manager */}
                <section>
                    <GroupPackagesManager items={groupPackages} />
                </section>
            </div>
        </div>
    );
}

