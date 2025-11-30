import { CONSTANTS } from '../config/constants';

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginationResult {
    skip: number;
    take: number;
    page: number;
    limit: number;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export const getPaginationParams = (
    page?: number | string,
    limit?: number | string
): PaginationResult => {
    const pageNum = typeof page === 'string' ? parseInt(page, 10) : page || CONSTANTS.PAGINATION.DEFAULT_PAGE;
    const limitNum = typeof limit === 'string' ? parseInt(limit, 10) : limit || CONSTANTS.PAGINATION.DEFAULT_LIMIT;

    const validPage = Math.max(1, pageNum);
    const validLimit = Math.min(Math.max(1, limitNum), CONSTANTS.PAGINATION.MAX_LIMIT);

    return {
        skip: (validPage - 1) * validLimit,
        take: validLimit,
        page: validPage,
        limit: validLimit,
    };
};

export const getPaginationMeta = (
    page: number,
    limit: number,
    total: number
): PaginationMeta => {
    const totalPages = Math.ceil(total / limit);

    return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
};
