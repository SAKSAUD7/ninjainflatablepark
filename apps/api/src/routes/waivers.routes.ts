import { Router } from 'express';
import * as waiversController from '../controllers/waivers.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { uploadWaiver } from '../middlewares/upload.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

// Filtered views
router.get('/adults', authorize(CONSTANTS.PERMISSIONS.WAIVERS_READ), waiversController.getAdultWaivers);
router.get('/minors', authorize(CONSTANTS.PERMISSIONS.WAIVERS_READ), waiversController.getMinorWaivers);

// CRUD operations
router.get('/', authorize(CONSTANTS.PERMISSIONS.WAIVERS_READ), waiversController.getAllWaivers);
router.get('/:id', authorize(CONSTANTS.PERMISSIONS.WAIVERS_READ), waiversController.getWaiverById);
router.post('/', authorize(CONSTANTS.PERMISSIONS.WAIVERS_WRITE), waiversController.createWaiver);
router.put('/:id', authorize(CONSTANTS.PERMISSIONS.WAIVERS_WRITE), waiversController.updateWaiver);

// Signature upload
router.post('/:id/signature', authorize(CONSTANTS.PERMISSIONS.WAIVERS_WRITE), uploadWaiver, waiversController.uploadSignature);

export default router;
