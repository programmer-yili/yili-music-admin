import { createRouter, createWebHashHistory } from 'vue-router';

import Layout from '../pages/Layout.vue';

export const menuRoutes = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    meta: { title: '控制台', icon: 'dashboard' },
    component: () => import('../pages/dashboard/Index.vue')
  },
  {
    path: 'user',
    name: 'User',
    meta: { title: '用户管理', icon: 'manage_accounts' },
    component: () => import('../pages/user/Index.vue')
  },
  {
    path: 'music',
    name: 'Music',
    meta: { title: '歌曲管理', icon: 'music_note' },
    component: () => import('../pages/music/Index.vue')
  },
  {
    path: 'artist',
    name: 'Artist',
    meta: { title: '歌手管理', icon: 'mic' },
    component: () => import('../pages/artist/Index.vue')
  },
  {
    path: 'playlist.js',
    name: 'Playlist',
    meta: { title: '歌单管理', icon: 'queue_music' },
    component: () => import('../pages/playlist/Index.vue')
  }
];
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: menuRoutes
  },

  {
    path: '/login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/403',
    component: () => import('../pages/403.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../pages/404.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
