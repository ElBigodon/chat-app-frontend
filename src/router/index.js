import Rooms from '@/views/Rooms.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rooms',
      component: Rooms,
    },
  ],
})

export default router
