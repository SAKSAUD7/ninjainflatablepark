import { AttractionsGrid } from "../../../features/attractions/components/AttractionsGrid";
import { ScrollReveal, SectionDivider } from "@repo/ui";
import { Coffee, Car, Shield, Wifi, Utensils, Users } from "lucide-react";
import { getPublicActivities } from "../../../lib/public-api";

export default async function AttractionsPage() {
    const activities = await getPublicActivities();

    const facilities = [
        {
            title: "Play Zones",
            description: "Separate age-appropriate play areas including ninja obstacle courses, climbing walls, and giant slides.",
            icon: <Users className="w-8 h-8 text-primary" />,
            items: ["Ninja Course", "Toddler Zone", "Giant Slides", "Wipeout Challenge"]
        },
        {
            title: "Ninja Café",
            description: "Refuel after your adventure with our selection of hot & cold drinks, meals, and snacks.",
            icon: <Coffee className="w-8 h-8 text-secondary" />,
            items: ["Hot & Cold Drinks", "Fresh Snacks", "Meals", "Seating Area"]
        },
        {
            title: "Party Rooms",
            description: "Private party rooms available for birthdays and special events with customizable packages.",
            icon: <Utensils className="w-8 h-8 text-accent" />,
            items: ["Private Space", "Decorations", "Hosting Staff", "Catering"]
        },
        {
            title: "Parking & Access",
            description: "Convenient access for all visitors with ample parking space.",
            icon: <Car className="w-8 h-8 text-primary" />,
            items: ["Free Parking (2 Hrs)", "Accessible Entry", "Drop-off Zone"]
        },
        {
            title: "Health & Safety",
            description: "Your safety is our priority with trained staff and first-aid facilities.",
            icon: <Shield className="w-8 h-8 text-secondary" />,
            items: ["First Aid Staff", "CCTV Surveillance", "Hygiene Stations", "Daily Cleaning"]
        },
        {
            title: "Amenities",
            description: "Everything you need for a comfortable visit.",
            icon: <Wifi className="w-8 h-8 text-accent" />,
            items: ["Free Wi-Fi", "Lockers", "Baby Care Room", "Merchandise Store"]
        }
    ];

    return (
        <main className="min-h-screen bg-background text-white">
            {/* Header */}
            <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 bg-gradient-to-b from-background-dark to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal animation="fade">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent text-white font-bold text-sm mb-6 tracking-wider uppercase">
                            {activities.length}+ Unique Zones
                        </span>
                    </ScrollReveal>
                    <ScrollReveal animation="slideUp" delay={0.2}>
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-black mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Our Attractions
                            </span>
                        </h1>
                        <p className="text-base md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto">
                            From ninja obstacle courses to giant slides, we've got something for everyone.
                            Choose your adventure!
                        </p>
                    </ScrollReveal>
                </div>
                <SectionDivider position="bottom" variant="curve" color="fill-background" />
            </section>

            {/* Attractions Grid */}
            <AttractionsGrid activities={activities} />

            {/* Park Facilities Section */}
            <section className="relative py-12 md:py-20 px-4 pb-32 md:pb-40 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slideUp">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black mb-6">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                    Park Facilities
                                </span>
                            </h2>
                            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
                                More than just bouncing! Explore our world-class facilities designed for your comfort and enjoyment.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((facility, index) => (
                            <ScrollReveal key={index} animation="fade" delay={index * 0.1}>
                                <div className="bg-surface-800 rounded-3xl border border-white/10 hover:border-primary/30 transition-colors flex flex-col overflow-hidden group">
                                    <div className="h-48 overflow-hidden relative flex-shrink-0">
                                        <img
                                            src={`/images/uploads/img-${(index % 10) + 1}.jpg`}
                                            alt={facility.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = "/images/hero-background.jpg";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface-800 to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md p-2 rounded-xl">
                                            {facility.icon}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-2xl font-display font-bold mb-3 text-white">
                                            {facility.title}
                                        </h3>
                                        <p className="text-white/70 mb-6">
                                            {facility.description}
                                        </p>
                                        <ul className="space-y-2 mt-auto">
                                            {facility.items.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>
        </main>
    );
}
