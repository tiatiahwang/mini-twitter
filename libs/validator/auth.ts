import { z } from 'zod';

export const JoinValidator = z.object({
  email: z
    .string()
    .min(1, 'required.')
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: 'need to be an email format.',
    }),
  password: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    }),
  username: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    }),
});

export const LoginValidator = z.object({
  email: z
    .string()
    .min(1, 'required.')
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: 'need to be an email format.',
    }),
  password: z
    .string()
    .min(2, {
      message: 'minimum 2 characters.',
    })
    .max(10, {
      message: 'maximum 10 characters.',
    }),
});

export type JoinRequest = z.infer<typeof JoinValidator>;
export type LoginRequest = z.infer<typeof LoginValidator>;
