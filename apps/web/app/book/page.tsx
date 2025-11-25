import { BookingWizard } from "@repo/ui";
import { createBooking } from "../actions/createBooking";

export default function Book() {
    return (
        <main className="min-h-screen bg-background py-6 md:py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8 lg:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-3 md:mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                            Book Your Session
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4">
                        Secure your spot at India's largest inflatable park. Choose your date, time, and get ready to bounce!
                    </p>
                </div>

                <BookingWizard onSubmit={createBooking} />
            </div>
        </main>
    );
}
