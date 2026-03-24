import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ và tên'),
  vgaCode:  z.string().min(1, 'Vui lòng nhập mã VGA'),
  phone:    z.string().regex(/^(0[3|5|7|8|9])\d{8}$/, 'Số điện thoại không hợp lệ'),
});

export type RegisterForm = z.infer<typeof registerSchema>;
