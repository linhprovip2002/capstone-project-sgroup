import express from 'express';
import { validateUserRegister,validatePasswordReset } from '../../middleware/';
import { authenticateController } from './index';
const router = express.Router();

router.post('/register', validateUserRegister, authenticateController.register);
router.post('/login', authenticateController.login);
router.post('/forgot-password', authenticateController.forgotPassword);
router.post('/reset-password/:tokenResetPassword',validatePasswordReset, authenticateController.resetPassword);

export default router;