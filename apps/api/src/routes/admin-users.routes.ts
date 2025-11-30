import { Router } from 'express';
import * as adminUsersController from '../controllers/admin-users.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/roles', authorize(CONSTANTS.PERMISSIONS.USERS_READ), adminUsersController.getAllRoles);
router.get('/', authorize(CONSTANTS.PERMISSIONS.USERS_READ), adminUsersController.getAllAdminUsers);
router.get('/:id', authorize(CONSTANTS.PERMISSIONS.USERS_READ), adminUsersController.getAdminUserById);
router.post('/', authorize(CONSTANTS.PERMISSIONS.USERS_WRITE), adminUsersController.createAdminUser);
router.put('/:id', authorize(CONSTANTS.PERMISSIONS.USERS_WRITE), adminUsersController.updateAdminUser);
router.delete('/:id', authorize(CONSTANTS.PERMISSIONS.USERS_WRITE), adminUsersController.deleteAdminUser);

export default router;
