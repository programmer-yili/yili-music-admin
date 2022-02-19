<template>
  <div class="page">
    <CosUploader label="上传" style="width: 40vw" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import CosUploader from '../../composables/useCosUploader.js';

export default {
  name: 'Index',
  components: { CosUploader },
  setup() {
    const store = useStore();
    return {
      nickname: computed(() => store.state.user.currentUser.nickname)
    };
  }
};
</script>

<style scoped></style>
