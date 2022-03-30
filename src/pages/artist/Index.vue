<template>
  <div>
    <div class="page">
      <div class="q-mt-md q-mb-md">
        <q-btn color="primary" label="添加歌手" @click="showDialog" />
      </div>
      <q-table
        :columns="columns"
        :rows="data"
        row-key="id"
        v-model:pagination="pagination"
        @request="fetchData"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              :color="artistStatusColor[props.value]"
              outline
              :label="artistStatus[props.value]"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-recommendFactor="props">
          <q-td :props="props">
            <div class="q-mb-xs">
              <q-badge
                v-if="props.row.recommended"
                color="red"
                outline
                label="推荐"
              />
            </div>
            <div>
              <q-badge color="blue" outline :label="props.value" />
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-photo="props">
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
              <q-list dense>
                <q-item
                  v-if="!props.row.recommended"
                  clickable
                  v-close-popup
                  @click="recommend(props.row)"
                >
                  <q-item-section>
                    <q-item-label>推荐</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-if="props.row.recommended"
                  clickable
                  v-close-popup
                  @click="cancelRecommendation(props.row.id)"
                >
                  <q-item-section>
                    <q-item-label>取消推荐</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
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
      @edit-success="fetchData"
    />
    <recommend-dialog
      v-if="recommendDialogShow"
      :data="editRow"
      @hide="recommendDialog.hideDialog"
      @success="fetchData"
    ></recommend-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import { artistStatus, artistStatusColor } from '../../utils/dict.js';
import artistApi from '../../api/artist.js';
import { useSearch } from '../../composables/useSearch.js';
import RecommendDialog from './RecommendDialog.vue';
import notify from '../../utils/notify.js';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: '歌手名字'
  },
  {
    name: 'remark',
    field: 'remark',
    label: '备注'
  },
  {
    name: 'photo',
    field: 'photo',
    label: '照片'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '上架状态'
  },
  {
    name: 'recommendFactor',
    field: 'recommendFactor',
    align: 'left',
    label: '推荐序号'
  },
  {
    name: 'operation',
    field: 'operation',
    label: '操作'
  }
];
const show = ref(false);
const { showDialog, hideDialog } = useToggleDialog(show);

const recommendDialogShow = ref(false);
const recommendDialog = useToggleDialog(recommendDialogShow);

const searchKeys = ref({ name: '' });
const { data, pagination, fetchData } = useSearch(artistApi.search, searchKeys);

const editRow = ref(null);
const edit = row => {
  editRow.value = row;
  showDialog();
};

const recommend = row => {
  editRow.value = row;
  recommendDialog.showDialog();
};

const cancelRecommendation = id => {
  artistApi.cancelRecommendation(id).then(() => {
    notify.success('取消推荐成功');
    fetchData();
  });
};
</script>

<style scoped></style>
