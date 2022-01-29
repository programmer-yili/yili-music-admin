<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加用户" @click="toggleDialog" />
    </div>
    <q-table :rows="data" :columns="columns" row-key="name" hide-pagination />
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
    <create-dialog v-if="showDialog" @hide="toggleDialog" />
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

const showDialog = ref(false);

const { toggleDialog } = useToggleDialog(showDialog);

const { data, pagination, pagesNumber, fetchData } = useUserSearch();
</script>

<style scoped></style>
