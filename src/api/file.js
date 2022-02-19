import { post } from './request.js';

export const initUpload = file => {
  return post('/files/upload_init', file);
};

export const finishUpload = fileId => {
  return post(`/files/${fileId}/upload_finish`);
};
