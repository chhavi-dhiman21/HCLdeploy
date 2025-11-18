import express from 'express';
import { register, login, getMyProfile, logout } from '../controllers/userController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getMyProfile);

export default router;