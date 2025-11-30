import { Router } from 'express';
import * as uploadsController from '../controllers/uploads.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.use(authenticate);

router.post('/', upload.single('file'), uploadsController.uploadFile);

export default router;
