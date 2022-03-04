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
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="musicStatusColor[props.value]"
            outline
            :label="musicStatus[props.value]"
          />
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
            <q-list dense>
              <q-item
                v-if="props.row.status !== 'PUBLISHED'"
                clickable
                v-close-popup
                @click="publishMusic(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>上架</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.status === 'PUBLISHED'"
                clickable
                v-close-popup
                @click="closeMusic(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>下架</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
    <create-dialog
      v-if="createDialogShow"
      :data="editRow"
      @hide="createDialog.hideDialog()"
      @create-success="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { list, publish, close } from '../../api/music.js';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';

import { musicStatus, musicStatusColor } from '../../utils/dict.js';
import notify from '../../utils/notify.js';

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
    align: 'center',
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

const createDialog = useToggleDialog(createDialogShow);

const editRow = ref(null);

const edit = row => {
  editRow.value = row;
  createDialog.showDialog();
};

const fetchData = () => {
  list().then(musicList => {
    data.value = musicList;
  });
};
onMounted(fetchData);

const publishMusic = id => {
  publish(id).then(() => {
    notify.success('音乐上架成功！');
    fetchData();
  });
};

const closeMusic = id => {
  close(id).then(() => {
    notify.success('音乐下架成功！');
    fetchData();
  });
};
</script>

<style scoped></style>
