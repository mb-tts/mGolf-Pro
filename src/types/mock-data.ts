import { User } from './auth.types';

export const MOCK_USER: User = {
  id:       'usr_001',
  fullName: 'Nguyễn Văn An',
  vgaCode:  'VGA123456',
  phone:    '0901234567',
  token:    'mock-jwt-token-xyz',
};

export const MOCK_CREDENTIALS = {
  vgaCode:  'VGA123456',
  password: 'Abc12345',
};
