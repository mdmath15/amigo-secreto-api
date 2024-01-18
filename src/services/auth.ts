import { getTodayDate } from '../utils/get-today-date';

export const validatePassword = (password: string): boolean => {
  const currentPassword = getTodayDate().split('/').join('');

  return password === currentPassword;
};

export const createToken = (): string => {
  const currentPassword = getTodayDate().split('/').join('');
  return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
};

export const validateToken = (token: string): boolean => {
  const currentToken = createToken();

  return token === currentToken;
};
