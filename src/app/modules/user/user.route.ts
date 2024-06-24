import express from 'express';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { authValidation } from '../auth/auth.validation';
import { authController } from '../auth/auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const userRoute = router;
