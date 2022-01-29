import { create } from '../api/user.js';
import { ref } from 'vue';

export const useCreateUser = () => {
  const username = ref('');
  const password = ref('');

  const createUser = (username, password) => {
    create({ username, password }).then(res => {
      console.log(res);
    });
  };

  return {
    username,
    password,
    createUser
  };
};
