import { Router } from 'express';
import * as cmsController from '../controllers/cms.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

// Activities
router.get('/activities', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.activities.getAll);
router.get('/activities/:id', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.activities.getById);
router.post('/activities', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.activities.create);
router.put('/activities/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.activities.update);
router.delete('/activities/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.activities.delete);

// Banners
router.get('/banners', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.banners.getAll);
router.get('/banners/:id', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.banners.getById);
router.post('/banners', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.banners.create);
router.put('/banners/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.banners.update);
router.delete('/banners/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.banners.delete);

// FAQs
router.get('/faqs', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.faqs.getAll);
router.get('/faqs/:id', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.faqs.getById);
router.post('/faqs', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.faqs.create);
router.put('/faqs/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.faqs.update);
router.delete('/faqs/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.faqs.delete);

// Testimonials
router.get('/testimonials', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.testimonials.getAll);
router.get('/testimonials/:id', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.testimonials.getById);
router.post('/testimonials', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.testimonials.create);
router.put('/testimonials/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.testimonials.update);
router.delete('/testimonials/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.testimonials.delete);

// Static Pages
router.get('/pages', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.staticPages.getAll);
router.get('/pages/:id', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.staticPages.getById);
router.post('/pages', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.staticPages.create);
router.put('/pages/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.staticPages.update);
router.delete('/pages/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.staticPages.delete);

// Social Links
router.get('/social', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.socialLinks.getAll);
router.get('/social/:id', authorize(CONSTANTS.PERMISSIONS.CMS_READ), cmsController.socialLinks.getById);
router.post('/social', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.socialLinks.create);
router.put('/social/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.socialLinks.update);
router.delete('/social/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), cmsController.socialLinks.delete);

export default router;
