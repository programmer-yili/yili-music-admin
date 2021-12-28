import { post } from './request';

export const login = (username, password) => {
  return post('/login', { username, password });
};
