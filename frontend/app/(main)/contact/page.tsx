import React from 'react';
import ContactContent from "./components/ContactContent";
import { getSettings } from "../../actions/settings";
import { siteConfig } from "@repo/config";


export default async function ContactPage() {
    const settings = await getSettings() as any;

    return (
        <ContactContent
            settings={settings}
            defaultConfig={siteConfig}
        />
    );
}
