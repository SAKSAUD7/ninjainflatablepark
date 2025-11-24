import { BookingWizard } from "@repo/ui";

export default function Book() {
    return (
        <main className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
                        Book Your Session
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Secure your spot at India's largest inflatable park. Choose your date, time, and get ready to bounce!
                    </p>
                </div>

                <BookingWizard />
            </div>
        </main>
    );
}
