import { get, post } from './request.js';

export const list = () => {
  return get('/artists');
};

export const search = artistSearchFilter => {
  return post('/artists/search', artistSearchFilter);
};

export const create = artist => {
  return post('/artists/', artist);
};

export const update = (id, fields) => {
  return post(`/artists/${id}`, fields);
};
