/**
 * API Client for Backend Communication
 * Handles all HTTP requests to the backend API at localhost:4000
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

class ApiClient {
    private baseURL: string;
    private token: string | null = null;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        // Try to get token from localStorage on client side
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('admin_token');
        }
    }

    setToken(token: string) {
        this.token = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin_token', token);
        }
    }

    clearToken() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_token');
        }
    }

    getToken() {
        return this.token;
    }

    private async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Request failed',
                };
            }

            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Network error',
            };
        }
    }

    // Auth endpoints
    async login(email: string, password: string) {
        const response = await this.request<{ user: any; token: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.success && response.data?.token) {
            this.setToken(response.data.token);
        }

        return response;
    }

    async logout() {
        const response = await this.request('/auth/logout', {
            method: 'POST',
        });
        this.clearToken();
        return response;
    }

    async getMe() {
        return this.request<{ id: string; email: string; name: string; role: any }>('/auth/me');
    }

    async changePassword(oldPassword: string, newPassword: string) {
        return this.request('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ oldPassword, newPassword }),
        });
    }

    // Bookings endpoints
    async getBookings(params?: any) {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request('/bookings' + queryString);
    }

    async getBooking(id: string) {
        return this.request(`/bookings/${id}`);
    }

    async createBooking(data: any) {
        return this.request('/bookings', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateBooking(id: string, data: any) {
        return this.request(`/bookings/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteBooking(id: string) {
        return this.request(`/bookings/${id}`, {
            method: 'DELETE',
        });
    }

    async getBookingStats() {
        return this.request('/bookings/stats');
    }

    // Customers endpoints
    async getCustomers(params?: any) {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request('/customers' + queryString);
    }

    async getCustomer(id: string) {
        return this.request(`/customers/${id}`);
    }

    async createCustomer(data: any) {
        return this.request('/customers', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateCustomer(id: string, data: any) {
        return this.request(`/customers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteCustomer(id: string) {
        return this.request(`/customers/${id}`, {
            method: 'DELETE',
        });
    }

    // Waivers endpoints
    async getWaivers(params?: any) {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request('/waivers' + queryString);
    }

    async getWaiver(id: string) {
        return this.request(`/waivers/${id}`);
    }

    async createWaiver(data: any) {
        return this.request('/waivers', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateWaiver(id: string, data: any) {
        return this.request(`/waivers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Calendar endpoints
    async checkAvailability(date: string, time: string) {
        return this.request(`/calendar/availability?date=${date}&time=${time}`);
    }

    async getBookingBlocks() {
        return this.request('/calendar/blocks');
    }

    async createBookingBlock(data: any) {
        return this.request('/calendar/blocks', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async deleteBookingBlock(id: string) {
        return this.request(`/calendar/blocks/${id}`, {
            method: 'DELETE',
        });
    }

    // Vouchers endpoints
    async getVouchers() {
        return this.request('/vouchers');
    }

    async createVoucher(data: any) {
        return this.request('/vouchers', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async validateVoucher(code: string) {
        return this.request('/vouchers/validate', {
            method: 'POST',
            body: JSON.stringify({ code }),
        });
    }

    // CMS endpoints
    async getActivities() {
        return this.request('/cms/activities');
    }

    async getBanners() {
        return this.request('/cms/banners');
    }

    async getFAQs() {
        return this.request('/cms/faqs');
    }

    async getTestimonials() {
        return this.request('/cms/testimonials');
    }

    async getStaticPages() {
        return this.request('/cms/pages');
    }

    // Settings endpoints
    async getSettings() {
        return this.request('/settings');
    }

    async updateSettings(data: any) {
        return this.request('/settings', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Admin Users endpoints
    async getAdminUsers() {
        return this.request('/admin-users');
    }

    async getRoles() {
        return this.request('/admin-users/roles');
    }

    // Activity Logs endpoints
    async getActivityLogs(params?: any) {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request('/logs' + queryString);
    }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types
export type { ApiResponse };
