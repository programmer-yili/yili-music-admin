import { get, post, put } from './request.js';

export const search = searchFilter => {
  return post('/musics/search', searchFilter);
};

export const create = music => {
  return post('/musics', music);
};

export const update = (id, music) => {
  return put(`/musics/${id}`, music);
};

export const publish = id => {
  return post(`/musics/${id}/publish`);
};

export const close = id => {
  return post(`/musics/${id}/close`);
};
