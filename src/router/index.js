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
