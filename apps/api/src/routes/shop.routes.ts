import { Router } from 'express';
import * as shopController from '../controllers/shop.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/products', authorize(CONSTANTS.PERMISSIONS.CMS_READ), shopController.getAllProducts);
router.get('/products/:id', authorize(CONSTANTS.PERMISSIONS.CMS_READ), shopController.getProductById);
router.post('/products', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), shopController.createProduct);
router.put('/products/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), shopController.updateProduct);
router.delete('/products/:id', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), shopController.deleteProduct);
router.patch('/products/:id/stock', authorize(CONSTANTS.PERMISSIONS.CMS_WRITE), shopController.updateStock);

export default router;
