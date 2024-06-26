import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required!'),
    email: z.string().email('Please provide valid email address!'),
    password: z.string().min(1, 'Password is required!'),
    phone: z.string().min(1, 'Phone number is required!'),
    role: z.enum(['user', 'admin']),
    address: z.string().min(1, 'Address is required!'),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
