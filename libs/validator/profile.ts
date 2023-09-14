import { z } from 'zod';

export const EditProfileValidator = z.object({
  username: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    })
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    })
    .optional()
    .or(z.literal('')),
  avatar: z.string().optional().or(z.literal('')),
});

export type EditProfileRequest = z.infer<
  typeof EditProfileValidator
>;
