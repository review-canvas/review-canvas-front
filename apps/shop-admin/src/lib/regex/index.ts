import { emailRegex, numberRegex, passwordRegex } from '@/constants/regex';

export const validateIsOnlyNumber = (value: string) => {
  return numberRegex.test(value);
};

export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return passwordRegex.test(password);
};
