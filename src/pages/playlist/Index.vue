<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加歌单" @click="showDialog" />
    </div>
    <q-table
      :columns="columns"
      :rows="data"
      row-key="id"
      v-model:pagination="pagination"
      @request="fetchData"
    >
      <template v-slot:body-cell-cover="props">
        <q-td :props="props">
          <q-avatar v-if="props.value" rounded>
            <img :src="props.value.uri" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <q-btn-dropdown
            size="sm"
            split
            color="primary"
            label="编辑"
            @click="edit(props.row)"
          >
            <q-list dense></q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
  </div>
  <create-dialog
    v-if="show"
    :data="editRow"
    @hide="hideDialog"
    @create-success="fetchData"
  />
</template>

<script setup>
import { useToggleDialog } from '../../composables/useToggleDialog';
import { ref } from 'vue';
import { useSearch } from '../../composables/useSearch';

import playlistApi from '../../api/playlist';
import CreateDialog from './CreateDialog.vue';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: '名称'
  },
  {
    name: 'cover',
    field: 'cover',
    label: '封面'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '上架状态'
  },
  {
    name: 'operation',
    field: 'operation',
    label: '操作'
  }
];

const { showDialog, hideDialog, show } = useToggleDialog();
const searchKeys = ref({ name: '' });
const { data, pagination, fetchData } = useSearch(
  playlistApi.search,
  searchKeys
);
const editRow = ref(null);

const edit = row => {
  editRow.value = row;
  showDialog();
};
</script>

<style scoped></style>
