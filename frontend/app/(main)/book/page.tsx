"use client";

import { BookingWizard } from "../../../components/BookingWizard";
import { createBooking } from "../../actions/createBooking";

export default function BookingPage() {
    return (
        <main className="bg-background min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                            Book Your Session
                        </span>
                    </h1>
                    <p className="text-lg text-white/70">
                        Reserve your spot at India's biggest inflatable park
                    </p>
                </div>

                <BookingWizard onSubmit={createBooking} />
            </div>
        </main>
    );
}
