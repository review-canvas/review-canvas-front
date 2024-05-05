import { emailRegex, passwordRegex } from '@/constants/regex';

export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return passwordRegex.test(password);
};
