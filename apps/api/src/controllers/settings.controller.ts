import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
    const settings = await prisma.globalSettings.findFirst();
    return successResponse(res, settings);
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
    const settings = await prisma.globalSettings.findFirst();

    const updated = await prisma.globalSettings.update({
        where: { id: settings?.id || '' },
        data: req.body,
    });

    return successResponse(res, updated, 'Settings updated successfully');
});
