<template>
  <q-dialog v-model="show" persistent @hide="$emit('hide')">
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加用户</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="username"
          label="用户名"
          autofocus
          @keyup.enter="show = false"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="password"
          label="密码"
          type="password"
          autofocus
          @keyup.enter="show = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          label="确认"
          color="primary"
          @click="createUser(username, password)"
        />
        <q-btn flat label="取消" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useCreateUser } from '../../composables/useCreateUser.js';

const show = ref(true);

const { createUser, username, password } = useCreateUser;
</script>

<style scoped></style>
