/**
 * Utility functions for handling media URLs from the backend
 */

/**
 * Converts a relative backend media URL to an absolute URL
 * @param url - The URL from the backend (could be relative or absolute)
 * @returns Absolute URL pointing to the backend server
 */
export function getMediaUrl(url: string | null | undefined): string {
    if (!url) return '';

    // If it's already an absolute URL (http/https), return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // If it's a relative media URL, convert to absolute
    if (url.startsWith('/media/') || url.startsWith('media/')) {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
        return `${API_BASE}${url.startsWith('/') ? url : '/' + url}`;
    }

    // For other relative URLs, return as is (might be data URLs or blob URLs)
    return url;
}
