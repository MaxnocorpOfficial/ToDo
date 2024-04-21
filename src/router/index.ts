import { createRouter, createWebHistory } from 'vue-router'
import Notes from '../views/Notes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: Notes
    },
    {
      path: '/note/:id',
      name: 'note',
      component: () => import('../views/SingleNote.vue')
    }
  ]
})

export default router
