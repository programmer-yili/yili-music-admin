<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加用户" @click="showDialog" />
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
import { useUserSearch } from '../../composables/useUserSearch.js';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
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

const show = ref(false);

const { showDialog, hideDialog } = useToggleDialog(show);

const pagination = ref({
  page: 1,
  rowsPerPage: 10
});

const { data, fetchData } = useUserSearch(pagination);
</script>

<style scoped></style>
