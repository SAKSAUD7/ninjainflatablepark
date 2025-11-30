import { Router } from 'express';
import * as logsController from '../controllers/logs.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/', authorize(CONSTANTS.PERMISSIONS.LOGS_READ), logsController.getAllLogs);
router.get('/:id', authorize(CONSTANTS.PERMISSIONS.LOGS_READ), logsController.getLogById);

export default router;
