import { Router } from 'express';
import authRoutes from './auth.routes';
import bookingsRoutes from './bookings.routes';
import waiversRoutes from './waivers.routes';
import customersRoutes from './customers.routes';
import vouchersRoutes from './vouchers.routes';
import calendarRoutes from './calendar.routes';
import cmsRoutes from './cms.routes';
import shopRoutes from './shop.routes';
import uploadsRoutes from './uploads.routes';
import settingsRoutes from './settings.routes';
import adminUsersRoutes from './admin-users.routes';
import logsRoutes from './logs.routes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/waivers', waiversRoutes);
router.use('/customers', customersRoutes);
router.use('/vouchers', vouchersRoutes);
router.use('/calendar', calendarRoutes);
router.use('/cms', cmsRoutes);
router.use('/shop', shopRoutes);
router.use('/uploads', uploadsRoutes);
router.use('/settings', settingsRoutes);
router.use('/admin-users', adminUsersRoutes);
router.use('/logs', logsRoutes);

export default router;
