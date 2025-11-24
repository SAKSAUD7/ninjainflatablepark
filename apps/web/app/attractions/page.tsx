import { AttractionsGrid } from "../../features/attractions/components/AttractionsGrid";
import { ScrollReveal, SectionDivider } from "@repo/ui";

export default function AttractionsPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            {/* Header */}
            <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-background-dark to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal animation="fade">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent text-white font-bold text-sm mb-6 tracking-wider uppercase">
                            11+ Unique Zones
                        </span>
                    </ScrollReveal>
                    <ScrollReveal animation="slideUp" delay={0.2}>
                        <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Our Attractions
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            From ninja obstacle courses to giant slides, we've got something for everyone.
                            Choose your adventure!
                        </p>
                    </ScrollReveal>
                </div>
                <SectionDivider position="bottom" variant="curve" color="fill-background" />
            </section>

            {/* Attractions Grid */}
            <AttractionsGrid />
        </main>
    );
}
