// Public API functions - fetch from Django backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchFromAPI(endpoint: string) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            cache: 'no-store', // Disable caching for SSR
        });

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        return [];
    }
}

export async function getPublicBanners() {
    const banners = await fetchFromAPI('/cms/banners/');
    return banners.filter((b: any) => b.active);
}

export async function getPublicTestimonials() {
    const testimonials = await fetchFromAPI('/cms/testimonials/');
    return testimonials.filter((t: any) => t.active).slice(0, 6);
}

export async function getPublicActivities() {
    const activities = await fetchFromAPI('/cms/activities/');
    return activities.filter((a: any) => a.active);
}

export async function getPublicFaqs() {
    const faqs = await fetchFromAPI('/cms/faqs/');
    return faqs.filter((f: any) => f.active);
}

export async function getGlobalSettings() {
    const settings = await fetchFromAPI('/core/settings/');

    // Return the first settings object or default
    if (settings && settings.length > 0) {
        const s = settings[0];
        // Transform Django snake_case to camelCase for frontend compatibility
        return {
            parkName: s.park_name || "Ninja Inflatable Park",
            contactPhone: s.contact_phone || "+91 98454 71611",
            contactEmail: s.contact_email || "info@ninjapark.com",
            address: s.address || "",
            mapUrl: s.map_url || "",
            openingHours: s.opening_hours || {},
            marqueeText: s.marquee_text || [],
            aboutText: s.about_text || "",
            heroTitle: s.hero_title || "",
            heroSubtitle: s.hero_subtitle || "",
            gstNumber: s.gst_number || "",
            sessionDuration: s.session_duration || 60,
            adultPrice: s.adult_price || 899,
            childPrice: s.child_price || 500,
            onlineBookingEnabled: s.online_booking_enabled !== false,
            partyBookingsEnabled: s.party_bookings_enabled !== false,
            maintenanceMode: s.maintenance_mode || false,
            waiverRequired: s.waiver_required !== false,
        };
    }

    // Return default settings if none exist
    return {
        parkName: "Ninja Inflatable Park",
        contactPhone: "+91 98454 71611",
        contactEmail: "info@ninjapark.com",
        address: "Ground Floor, Gopalan Innovation Mall, Bannerghatta Main Rd, JP Nagar 3rd Phase, Bengaluru, Karnataka 560076",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750939864231!2d77.5986873750756!3d12.92372298738734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1580228d7a45%3A0x644e04369062342c!2sGopalan%20Innovation%20Mall!5e0!3m2!1sen!2sin!4v1709901234567!5m2!1sen!2sin",
        openingHours: {
            weekdays: "11:00 AM - 10:00 PM",
            weekends: "10:00 AM - 11:00 PM"
        },
        aboutText: "Ninja Inflatable Park is India's largest inflatable adventure park, offering a unique blend of fun, fitness, and thrill.",
        sessionDuration: 60,
        adultPrice: 899,
        childPrice: 500,
        onlineBookingEnabled: true,
        partyBookingsEnabled: true,
        maintenanceMode: false,
        waiverRequired: true,
    };
}

export async function getPublicSocialLinks() {
    const socialLinks = await fetchFromAPI('/cms/social-links/');
    return socialLinks.filter((s: any) => s.active);
}
