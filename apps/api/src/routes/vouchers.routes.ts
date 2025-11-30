import { Router } from 'express';
import * as vouchersController from '../controllers/vouchers.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/', authorize(CONSTANTS.PERMISSIONS.VOUCHERS_READ), vouchersController.getAllVouchers);
router.get('/:id', authorize(CONSTANTS.PERMISSIONS.VOUCHERS_READ), vouchersController.getVoucherById);
router.post('/', authorize(CONSTANTS.PERMISSIONS.VOUCHERS_WRITE), vouchersController.createVoucher);
router.put('/:id', authorize(CONSTANTS.PERMISSIONS.VOUCHERS_WRITE), vouchersController.updateVoucher);
router.delete('/:id', authorize(CONSTANTS.PERMISSIONS.VOUCHERS_WRITE), vouchersController.deleteVoucher);
router.post('/validate', vouchersController.validateVoucher);
router.get('/:id/usage', authorize(CONSTANTS.PERMISSIONS.VOUCHERS_READ), vouchersController.getVoucherUsage);

export default router;
