import express from 'express';
import { authValidation } from './auth.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { authController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const authRoutes = router;
