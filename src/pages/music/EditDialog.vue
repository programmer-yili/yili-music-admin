<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">编辑音乐</div>
      </q-card-section>
      <q-form @submit="editMusic()" class="q-gutter-md">
        <q-card-section>
          <q-input
            dense
            v-model="music.name"
            label="音乐名"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写音乐名！']"
          />

          <q-input
            dense
            v-model="music.description"
            label="简介"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn label="保存" type="submit" color="primary" />
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { update } from '../../api/music.js';
import notify from '../../utils/notify.js';

const show = ref(true);
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const music = reactive({
  name: props.data.name,
  description: props.data.description
});

const id = ref(props.data.id);

const emmit = defineEmits(['edit-success']);

const editMusic = () => {
  update(id.value, music).then(updatedMusic => {
    show.value = false;
    notify.success(`音乐《${updatedMusic.name}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
