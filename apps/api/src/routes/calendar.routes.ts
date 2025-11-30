import { Router } from 'express';
import * as calendarController from '../controllers/calendar.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { CONSTANTS } from '../config/constants';

const router = Router();

router.use(authenticate);

router.get('/availability', calendarController.checkAvailability);
router.get('/blocks', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_READ), calendarController.getBookingBlocks);
router.post('/blocks', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_WRITE), calendarController.createBookingBlock);
router.put('/blocks/:id', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_WRITE), calendarController.updateBookingBlock);
router.delete('/blocks/:id', authorize(CONSTANTS.PERMISSIONS.BOOKINGS_WRITE), calendarController.deleteBookingBlock);

export default router;
