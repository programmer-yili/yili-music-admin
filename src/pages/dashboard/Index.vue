<template>
  <div>欢迎光临 {{ nickname }}</div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Index',
  setup() {
    const store = useStore();
    return {
      nickname: computed(() => store.state.user.currentUser.nickname)
    };
  }
};
</script>

<style scoped></style>
