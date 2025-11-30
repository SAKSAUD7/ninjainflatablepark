import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getFileUrl } from '../middlewares/upload.middleware';

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        return errorResponse(res, 'No file uploaded', 400);
    }

    const { uploadType } = req.body;
    const fileUrl = getFileUrl(req, req.file.filename, uploadType || 'waivers');

    return successResponse(res, {
        filename: req.file.filename,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
    }, 'File uploaded successfully');
});
