import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, createdResponse, notFoundResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(page as string, limit as string);

    const [products, total] = await Promise.all([
        prisma.product.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
        prisma.product.count(),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);
    return successResponse(res, products, undefined, 200, meta);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) return notFoundResponse(res, 'Product not found');
    return successResponse(res, product);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await prisma.product.create({ data: req.body });
    return createdResponse(res, product, 'Product created successfully');
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
    return successResponse(res, product, 'Product updated successfully');
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    await prisma.product.delete({ where: { id: req.params.id } });
    return successResponse(res, null, 'Product deleted successfully');
});

export const updateStock = asyncHandler(async (req: Request, res: Response) => {
    const { stock } = req.body;
    const product = await prisma.product.update({
        where: { id: req.params.id },
        data: { stock },
    });
    return successResponse(res, product, 'Stock updated successfully');
});
