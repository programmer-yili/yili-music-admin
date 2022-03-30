import { get, post, put } from './request.js';

const search = searchFilter => {
  return post('/musics/search', searchFilter);
};

const create = music => {
  return post('/musics', music);
};

const update = (id, music) => {
  return put(`/musics/${id}`, music);
};

const publish = id => {
  return post(`/musics/${id}/publish`);
};

const close = id => {
  return post(`/musics/${id}/close`);
};

export default {
  search,
  create,
  update,
  publish,
  close
};
