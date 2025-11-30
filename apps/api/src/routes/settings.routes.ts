import { Router } from 'express';
import * as settingsController from '../controllers/settings.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/', authorize(CONSTANTS.PERMISSIONS.SETTINGS_READ), settingsController.getSettings);
router.put('/', authorize(CONSTANTS.PERMISSIONS.SETTINGS_WRITE), settingsController.updateSettings);

export default router;
