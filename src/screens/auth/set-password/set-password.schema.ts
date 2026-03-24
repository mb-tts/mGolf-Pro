import { z } from 'zod';

export const setPasswordSchema = z
  .object({
    password:        z.string()
      .min(8, 'Tối thiểu 8 ký tự')
      .regex(/[A-Z]/,  'Phải có ít nhất 1 chữ hoa')
      .regex(/[0-9]/,  'Phải có ít nhất 1 chữ số'),
    confirmPassword: z.string().min(1, 'Vui lòng nhập lại mật khẩu'),
  })
  .refine(d => d.password === d.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path:    ['confirmPassword'],
  });

export type SetPasswordForm = z.infer<typeof setPasswordSchema>;
