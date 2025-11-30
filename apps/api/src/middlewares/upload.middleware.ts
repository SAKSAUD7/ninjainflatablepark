import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from '../config/env';
import { CONSTANTS } from '../config/constants';
import { Request } from 'express';

// Ensure upload directories exist
const ensureUploadDir = (folder: string) => {
    const dir = path.join(config.upload.dir, folder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
};

// Configure storage
const storage = multer.diskStorage({
    destination: (req: Request, _file, cb) => {
        // Determine folder based on field name
        const folder = req.body.uploadType || CONSTANTS.UPLOAD_FOLDERS.WAIVERS;
        const dir = ensureUploadDir(folder);
        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9]/g, '-')
            .toLowerCase();
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
});

// File filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Check file type
    if (config.upload.allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Allowed types: ${config.upload.allowedTypes.join(', ')}`));
    }
};

// Create multer instance
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: config.upload.maxSize,
    },
});

// Upload middleware for different types
export const uploadWaiver = upload.single('signature');
export const uploadBanner = upload.single('image');
export const uploadActivity = upload.single('image');
export const uploadProduct = upload.single('image');
export const uploadTestimonial = upload.single('image');
export const uploadMultiple = upload.array('files', 10);

// Helper to get file URL
export const getFileUrl = (req: Request, filename: string, folder: string): string => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return `${baseUrl}/uploads/${folder}/${filename}`;
};

// Helper to delete file
export const deleteFile = (filepath: string): void => {
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
};
