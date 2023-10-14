import express from 'express';
import { authenticateController } from './index';
const router = express.Router();

router.post('/register', authenticateController.register);
router.post('/login', authenticateController.login);
router.post('/forgot-password', authenticateController.forgotPassword);
router.post('/reset-password/:tokenResetPassword', authenticateController.resetPassword);

export default router;