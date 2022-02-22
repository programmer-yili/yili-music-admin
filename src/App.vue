<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(store.dispatch('setting/fetchSiteSetting'));
</script>

<template>
  <router-view />
</template>

<style></style>
