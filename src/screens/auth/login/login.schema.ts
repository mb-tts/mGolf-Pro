import { z } from 'zod';

export const loginSchema = z.object({
  vgaCode:  z.string().min(1, 'Vui lòng nhập mã VGA'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

export type LoginForm = z.infer<typeof loginSchema>;
