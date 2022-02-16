<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn
        color="primary"
        label="添加歌曲"
        @click="createDialog.showDialog()"
      />
    </div>
    <q-table :columns="columns" :rows="data" row-key="id">
      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <q-btn flat color="primary" label="编辑" @click="edit(props.value)" />
        </q-td>
      </template>
    </q-table>
    <create-dialog
      v-if="createDialogShow"
      @hide="createDialog.hideDialog()"
      @create-success="fetchData"
    />
    <edit-dialog
      v-if="editDialogShow"
      @hide="editDialog.hideDialog()"
      @edit-success="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { list } from '../../api/music.js';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import EditDialog from './EditDialog.vue';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: '歌曲名'
  },
  {
    name: 'description',
    field: 'description',
    label: '简介'
  },
  {
    name: 'status',
    field: 'status',
    label: '上架状态'
  },
  {
    name: 'operation',
    field: 'operation',
    label: '操作'
  }
];

const data = ref([]);

const createDialogShow = ref(false);
const editDialogShow = ref(false);

const createDialog = useToggleDialog(createDialogShow);

const editDialog = useToggleDialog(editDialogShow);

const edit = value => {
  console.log(value);
};

const fetchData = () => {
  list().then(musicList => {
    data.value = musicList;
  });
};
onMounted(fetchData);
</script>

<style scoped></style>
