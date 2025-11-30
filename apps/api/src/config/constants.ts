export const CONSTANTS = {
    // Booking Types
    BOOKING_TYPES: {
        SESSION: 'SESSION',
        PARTY: 'PARTY',
        MANUAL: 'MANUAL',
    },

    // Booking Statuses
    BOOKING_STATUS: {
        PENDING: 'PENDING',
        CONFIRMED: 'CONFIRMED',
        CANCELLED: 'CANCELLED',
        COMPLETED: 'COMPLETED',
    },

    // Payment Statuses
    PAYMENT_STATUS: {
        PENDING: 'PENDING',
        PAID: 'PAID',
        REFUNDED: 'REFUNDED',
        FAILED: 'FAILED',
    },

    // Waiver Statuses
    WAIVER_STATUS: {
        PENDING: 'PENDING',
        SIGNED: 'SIGNED',
    },

    // Roles
    ROLES: {
        SUPER_ADMIN: 'SUPER_ADMIN',
        MANAGER: 'MANAGER',
        STAFF: 'STAFF',
        CONTENT_EDITOR: 'CONTENT_EDITOR',
        VIEWER: 'VIEWER',
    },

    // Permissions
    PERMISSIONS: {
        BOOKINGS_READ: 'bookings:read',
        BOOKINGS_WRITE: 'bookings:write',
        BOOKINGS_DELETE: 'bookings:delete',
        WAIVERS_READ: 'waivers:read',
        WAIVERS_WRITE: 'waivers:write',
        CUSTOMERS_READ: 'customers:read',
        CUSTOMERS_WRITE: 'customers:write',
        VOUCHERS_READ: 'vouchers:read',
        VOUCHERS_WRITE: 'vouchers:write',
        CMS_READ: 'cms:read',
        CMS_WRITE: 'cms:write',
        SETTINGS_READ: 'settings:read',
        SETTINGS_WRITE: 'settings:write',
        USERS_READ: 'users:read',
        USERS_WRITE: 'users:write',
        LOGS_READ: 'logs:read',
    },

    // Audit Actions
    AUDIT_ACTIONS: {
        LOGIN: 'LOGIN',
        LOGOUT: 'LOGOUT',
        CREATE: 'CREATE',
        UPDATE: 'UPDATE',
        DELETE: 'DELETE',
        APPROVE: 'APPROVE',
        REJECT: 'REJECT',
    },

    // Pricing (default values)
    PRICING: {
        ADULT: 899,
        CHILD: 500,
        SPECTATOR: 150,
        EXTRA_HOUR: 500,
        GST_RATE: 0.18,
    },

    // Pagination
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 20,
        MAX_LIMIT: 100,
    },

    // File Upload
    UPLOAD_FOLDERS: {
        WAIVERS: 'waivers',
        BANNERS: 'banners',
        ACTIVITIES: 'activities',
        PRODUCTS: 'products',
        TESTIMONIALS: 'testimonials',
    },
};

export default CONSTANTS;
