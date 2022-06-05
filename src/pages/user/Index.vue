<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加用户" @click="showDialog" />
    </div>

    <div
      class="fit row no-wrap justify-start items-center content-start q-mb-md"
    >
      <q-input
        dense
        v-model="searchKeys.nickname"
        placeholder="用户名"
        class="q-mr-md"
      />
      <q-btn color="primary" label="检索" @click="fetchData" />
    </div>
    <q-table
      :rows="data"
      :columns="columns"
      row-key="name"
      @request="fetchData"
      v-model:pagination="pagination"
    />
    <create-dialog v-if="show" @hide="hideDialog" @create-success="fetchData" />
  </div>
</template>

<script setup>
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import userApi from '../../api/user.js';
import { useSearch } from '../../composables/useSearch.js';
import { ref } from 'vue';

const columns = [
  {
    label: 'ID',
    field: 'id'
  },
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'nickname',
    label: '昵称'
  }
];

const { showDialog, hideDialog, show } = useToggleDialog();

const searchKeys = ref({ nickname: '' });
const { data, fetchData, pagination } = useSearch(userApi.search, searchKeys);
</script>

<style scoped></style>
