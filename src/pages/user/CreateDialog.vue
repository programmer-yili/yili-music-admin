<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加用户</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="userModel.username"
          label="用户名"
          autofocus
          @keyup.enter="show = false"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="userModel.password"
          label="密码"
          autofocus
          @keyup.enter="show = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn label="确认" color="primary" @click="createUser" />
        <q-btn flat label="取消" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import userApi from '../../api/user.js';
import { ref } from 'vue';
import notify from '../../utils/notify.js';

const show = ref(true);

const userModel = ref({
  username: '',
  password: ''
});
const emmit = defineEmits(['create-success']);
const createUser = () => {
  userApi.create(userModel.value).then(res => {
    show.value = false;
    notify.success('用户创建成功');
    emmit('create-success');
  });
};
</script>

<style scoped></style>
