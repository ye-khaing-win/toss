import express from 'express';
import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch(
  '/change-password',
  authMiddleware.protect,
  authController.changePassword
);
router.patch('/update-me', authMiddleware.protect, authController.updateMe);
router.delete('/delete-me', authMiddleware.protect, authController.deleteMe);

export default router;
