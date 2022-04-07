<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加歌单</div>
      </q-card-section>
      <q-form @submit="isEdit ? edit() : create()" class="q-gutter-md">
        <q-card-section>
          <q-input
            dense
            v-model="playlist.name"
            label="名称"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写歌单名称！']"
          />

          <q-input
            dense
            v-model="playlist.description"
            label="歌单描述"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>
        <q-card-section>
          <uploader label="上传歌单封面" v-model:file="playlist.cover" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn label="确认" type="submit" color="primary" />
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import Uploader from '../../components/Uploader.vue';
import { reactive, ref } from 'vue';
import notify from '../../utils/notify';
import playlistApi from '../../api/playlist';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null;
    }
  }
});

const show = ref(true);
const file = ref(null);
const isEdit = ref(Boolean(props.data));

const playlist = reactive(
  props.data || { name: '', description: '', cover: null }
);

const emmit = defineEmits(['create-success']);

const create = () => {
  playlistApi
    .create({
      name: playlist.name,
      description: playlist.description,
      coverId: playlist.cover.id
    })
    .then(created => {
      show.value = false;
      notify.success(`歌单《${created.name}》创建成功！`);
      emmit('create-success');
    })
    .catch(error => {
      notify.error(error.message);
    });
};

const edit = () => {};
</script>

<style scoped></style>
