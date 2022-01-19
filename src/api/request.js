import axios from 'axios';
import store from '../store';
import { Notify } from 'quasar';
import { evaEdit } from '@quasar/extras/eva-icons';

const baseURL = import.meta.env.VITE_API_HOST;
const tokenPrefix = 'Bearer ';
const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.state.user.token) {
      config.headers['Authorization'] = tokenPrefix + store.state.user.token;
    }

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    handleErrorResponse(error.response);
    return Promise.reject(error);
  }
);

const handleErrorResponse = response => {
  if (response.status === 401 || response.status === 403) {
    store.dispatch('user/logout').then(() => window.location.reload());
  }
  Notify.create({
    type: 'negative',
    message: response.data.message,
    position: 'top'
  });
};

const { get, post, put } = instance;

export { get, post, put };
