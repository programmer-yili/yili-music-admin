import { get, post } from './request';

const search = searchFilter => {
  return get('/playlists/', { params: searchFilter });
};

const create = playlist => {
  return post('/playlists/', playlist);
};

const update = (id, fields) => {
  return post(`/playlists/${id}`, fields);
};

export default {
  search,
  create,
  update
};
