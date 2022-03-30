import { get, post } from './request.js';

const search = artistSearchFilter => {
  return get('/artists', { params: artistSearchFilter });
};

const create = artist => {
  return post('/artists', artist);
};

const update = (id, fields) => {
  return post(`/artists/${id}`, fields);
};

const recommend = (id, recommendFactor) => {
  return post(`/artists/${id}/recommend`, { recommendFactor });
};

const cancelRecommendation = id => {
  return post(`/artists/${id}/cancel_recommendation`);
};

export default {
  search,
  create,
  update,
  recommend,
  cancelRecommendation
};
