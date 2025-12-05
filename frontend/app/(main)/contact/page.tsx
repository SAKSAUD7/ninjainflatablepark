import React from 'react';
import ContactContent from "./components/ContactContent";
import { getPageSections } from "../../actions/page-sections";
import { getSettings } from "../../actions/settings";
import { siteConfig } from "@repo/config";

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    const [
        settings,
        pageSections
    ] = await Promise.all([
        getSettings(),
        getPageSections('contact')
    ]) as [any, any[]];

    const heroSection = pageSections.find((s: any) => s.section_key === 'hero');

    const hero = heroSection ? {
        title: heroSection.title,
        subtitle: heroSection.content,
        image: heroSection.image_url
    } : undefined;

    return (
        <ContactContent
            settings={settings}
            hero={hero}
            defaultConfig={siteConfig}
        />
    );
}
