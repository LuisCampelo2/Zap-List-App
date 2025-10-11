import express from 'express';
const router = express.Router();
import { authController } from '../controllers/authController.js';

router.post('/register', authController.register);
router.get('/activation/:activationToken', authController.activate);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.post('/forgot-password',authController.sendEmailWithToken);
router.post('/compare-token',authController.compareToken);
router.post('/reset-password',authController.resetPassword);
export default router;