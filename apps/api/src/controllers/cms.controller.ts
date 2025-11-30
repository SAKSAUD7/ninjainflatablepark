import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, createdResponse, notFoundResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';
import { CONSTANTS } from '../config/constants';

// Generic CRUD for CMS entities
const createCRUDHandlers = (model: any, entityName: string) => ({
    getAll: asyncHandler(async (req: Request, res: Response) => {
        const { page, limit } = req.query;
        const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(page as string, limit as string);

        const [items, total] = await Promise.all([
            model.findMany({ skip, take, orderBy: { order: 'asc' } }),
            model.count(),
        ]);

        const meta = getPaginationMeta(currentPage, currentLimit, total);
        return successResponse(res, items, undefined, 200, meta);
    }),

    getById: asyncHandler(async (req: Request, res: Response) => {
        const item = await model.findUnique({ where: { id: req.params.id } });
        if (!item) return notFoundResponse(res, `${entityName} not found`);
        return successResponse(res, item);
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
        const item = await model.create({ data: req.body });
        if (req.user) {
            await prisma.auditLog.create({
                data: {
                    adminId: req.user.id,
                    action: CONSTANTS.AUDIT_ACTIONS.CREATE,
                    entity: entityName.toUpperCase(),
                    entityId: item.id,
                    ipAddress: req.ip,
                    userAgent: req.get('user-agent'),
                },
            });
        }
        return createdResponse(res, item, `${entityName} created successfully`);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
        const item = await model.update({ where: { id: req.params.id }, data: req.body });
        if (req.user) {
            await prisma.auditLog.create({
                data: {
                    adminId: req.user.id,
                    action: CONSTANTS.AUDIT_ACTIONS.UPDATE,
                    entity: entityName.toUpperCase(),
                    entityId: item.id,
                    ipAddress: req.ip,
                    userAgent: req.get('user-agent'),
                },
            });
        }
        return successResponse(res, item, `${entityName} updated successfully`);
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
        await model.delete({ where: { id: req.params.id } });
        if (req.user) {
            await prisma.auditLog.create({
                data: {
                    adminId: req.user.id,
                    action: CONSTANTS.AUDIT_ACTIONS.DELETE,
                    entity: entityName.toUpperCase(),
                    entityId: req.params.id,
                    ipAddress: req.ip,
                    userAgent: req.get('user-agent'),
                },
            });
        }
        return successResponse(res, null, `${entityName} deleted successfully`);
    }),
});

export const activities = createCRUDHandlers(prisma.activity, 'Activity');
export const banners = createCRUDHandlers(prisma.banner, 'Banner');
export const faqs = createCRUDHandlers(prisma.faq, 'FAQ');
export const testimonials = createCRUDHandlers(prisma.testimonial, 'Testimonial');
export const staticPages = createCRUDHandlers(prisma.staticPage, 'StaticPage');
export const socialLinks = createCRUDHandlers(prisma.socialLink, 'SocialLink');
export const invitationTemplates = createCRUDHandlers(prisma.invitationTemplate, 'InvitationTemplate');
export const galleryItems = createCRUDHandlers(prisma.galleryItem, 'GalleryItem');
