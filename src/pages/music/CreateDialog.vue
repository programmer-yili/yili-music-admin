<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加音乐</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editMusic() : createMusic()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            outlined
            v-model="music.name"
            label="音乐名"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写音乐名！']"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="music.description"
            label="简介"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>

        <q-card-section>
          <artist-selection v-model:artistList="music.artistList" />
        </q-card-section>

        <q-card-section>
          <uploader label="上传音乐" v-model:file="music.file" />
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
import { reactive, ref } from 'vue';
import { create, update } from '../../api/music.js';
import notify from '../../utils/notify.js';
import Uploader from '../../components/Uploader.vue';
import ArtistSelection from '../../components/ArtistSelection.vue';

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

const music = reactive(
  props.data || { name: '', description: '', file: null, artistList: [] }
);

const emmit = defineEmits(['create-success', 'edit-success']);

const createMusic = () => {
  const createMusicRequest = {
    ...music,
    fileId: music.file.id,
    artistIds:
      music.artistList.length === 0 ? [] : music.artistList.map(item => item.id)
  };
  create(createMusicRequest).then(createdMusic => {
    show.value = false;
    notify.success(`音乐《${createdMusic.name}》创建成功！`);
    emmit('create-success');
  });
};

const editMusic = () => {
  const updateMusicRequest = {
    ...music,
    fileId: music.file.id,
    artistIds:
      music.artistList.length === 0 ? [] : music.artistList.map(item => item.id)
  };
  update(music.id, updateMusicRequest).then(updatedMusic => {
    show.value = false;
    notify.success(`音乐《${updatedMusic.name}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
