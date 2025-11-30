import { Router } from 'express';
import * as bookingsController from '../controllers/bookings.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Dashboard stats
router.get('/stats', bookingsController.getDashboardStats);

// CRUD operations
router.get('/', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_READ), bookingsController.getAllBookings);
router.get('/:id', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_READ), bookingsController.getBookingById);
router.post('/', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_WRITE), bookingsController.createBooking);
router.put('/:id', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_WRITE), bookingsController.updateBooking);
router.delete('/:id', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_DELETE), bookingsController.deleteBooking);

// Status updates
router.patch('/:id/status', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_WRITE), bookingsController.updateBookingStatus);

export default router;
