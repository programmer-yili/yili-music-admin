import axios from 'axios';
import store from '../store';
import notify from '../utils/notify.js';

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
    if (response.data.code) {
      handleErrorResponse(response);
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    if (!error.response) {
      notify.error('请求不成功，请联系后台管理员');
    }
    handleErrorResponse(error.response);
    return Promise.reject(error);
  }
);

const handleErrorResponse = response => {
  if (response.status === 401 || response.status === 403) {
    store.dispatch('user/logout').then(() => window.location.reload());
  }

  if (response.data instanceof Array) {
    response.data.forEach(item => {
      notify.error(item.message);
    });
  } else {
    notify.error(response.data.message);
  }
};

const { get, post, put } = instance;

export { get, post, put };
