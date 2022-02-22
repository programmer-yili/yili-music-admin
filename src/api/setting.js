import { get } from './request.js';

export const getSiteSetting = () => {
  return get('/settings/site');
};
