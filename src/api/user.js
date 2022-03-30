import { get, post } from './request';

const search = paging => {
  return get('/users/', { params: paging });
};

const me = () => {
  return get('/users/me');
};

const create = user => {
  return post('/users', user);
};

export default {
  create,
  me,
  search
};
