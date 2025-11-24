import { BookingWizard } from "@repo/ui";
import { createBooking } from "../actions/createBooking";

export default function Book() {
    return (
        <main className="min-h-screen bg-background py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Background */}
                <div className="relative text-center mb-12 py-16 px-6 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/promo-pricing.jpg"
                            alt="Book Your Session"
                            className="w-full h-full object-cover opacity-25"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Book Your Session
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Secure your spot at India's largest inflatable park. Choose your date, time, and get ready to bounce!
                        </p>
                        {/* Promotional Images */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img
                                    src="/promo-party.jpg"
                                    alt="Party Packages"
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-white mb-1">Party Packages</h3>
                                        <p className="text-white/80 text-sm">Perfect for birthdays & celebrations</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img
                                    src="/park-birthday-party.jpg"
                                    alt="Group Bookings"
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-white mb-1">Group Bookings</h3>
                                        <p className="text-white/80 text-sm">Special rates for groups of 10+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <BookingWizard onSubmit={createBooking} />
            </div>
        </main>
    );
}
