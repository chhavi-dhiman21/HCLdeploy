import express from 'express';
import { register, login, getMyProfile, logout, getWellnessGoals, updateWellnessGoals, addCustomWellnessGoal } from '../controllers/userController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getMyProfile);
router.route('/wellness')
  .get(isAuthenticatedUser, getWellnessGoals)
  .put(isAuthenticatedUser, updateWellnessGoals);
router.route('/wellness/custom')
  .post(isAuthenticatedUser, addCustomWellnessGoal);

export default router;