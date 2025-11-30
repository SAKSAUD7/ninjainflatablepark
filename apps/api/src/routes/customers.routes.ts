import { Router } from 'express';
import * as customersController from '../controllers/customers.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/', authorize(CONSTANTS.PERMISSIONS.CUSTOMERS_READ), customersController.getAllCustomers);
router.get('/:id', authorize(CONSTANTS.PERMISSIONS.CUSTOMERS_READ), customersController.getCustomerById);
router.post('/', authorize(CONSTANTS.PERMISSIONS.CUSTOMERS_WRITE), customersController.createCustomer);
router.put('/:id', authorize(CONSTANTS.PERMISSIONS.CUSTOMERS_WRITE), customersController.updateCustomer);
router.delete('/:id', authorize(CONSTANTS.PERMISSIONS.CUSTOMERS_WRITE), customersController.deleteCustomer);
router.get('/:id/bookings', authorize(CONSTANTS.PERMISSIONS.CUSTOMERS_READ), customersController.getCustomerBookings);
router.get('/:id/waivers', authorize(CONSTANTS.PERMISSIONS.CUSTOMERS_READ), customersController.getCustomerWaivers);

export default router;
