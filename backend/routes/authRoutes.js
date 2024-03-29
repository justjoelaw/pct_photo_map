import express from 'express';
import * as authController from '../controllers/authController.js';
import loginLimiter from '../middleware/loginLimiter.js';

const router = express.Router();

router.route('/').post(loginLimiter, authController.login);

router.route('/refresh').get(authController.refresh);

router.route('/logout').post(authController.logout);

router.route('/verify').post(authController.verifyEmail);

export default router;
