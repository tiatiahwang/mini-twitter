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
  newPassword: z
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

export const EditAvatarValidator = z.object({
  avatar: z.string(),
});

export const EditUsernameValidator = z.object({
  username: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    }),
});

export const EditPasswordValidator = z.object({
  password: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    }),
  newPassword: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    }),
});

export type EditProfileRequest = z.infer<
  typeof EditProfileValidator
>;

export type EditAvatarRequest = z.infer<
  typeof EditAvatarValidator
>;

export type EditUsernameRequest = z.infer<
  typeof EditUsernameValidator
>;

export type EditPasswordRequest = z.infer<
  typeof EditPasswordValidator
>;
