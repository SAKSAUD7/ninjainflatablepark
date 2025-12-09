import React from 'react';
import PartyContent from "./components/PartyContent";
import { getPartyPackages } from "../../actions/party-packages";
import { getMenuSections } from "../../actions/menu-sections";
import { getPageSections } from "../../actions/page-sections";
import { getSettings } from "../../actions/settings";


export default async function Parties() {
    // Fetch data
    const [
        partyPackages,
        menuSections,
        pageSections,
        settings
    ] = await Promise.all([
        getPartyPackages(),
        getMenuSections(),
        getPageSections('party-booking'),
        getSettings()
    ]) as [any[], any[], any[], any];

    const heroSection = pageSections.find((s: any) => s.section_key === 'hero');
    const termsSection = pageSections.find((s: any) => s.section_key === 'terms');

    const hero = heroSection ? {
        title: heroSection.title,
        subtitle: heroSection.content,
        image: heroSection.image_url
    } : undefined;

    return (
        <PartyContent
            packages={partyPackages}
            menus={menuSections}
            hero={hero}
            settings={settings}
            terms={termsSection?.content}
        />
    );
}
