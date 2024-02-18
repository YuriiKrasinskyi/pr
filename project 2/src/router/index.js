import { createRouter, createWebHistory } from 'vue-router'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import TasksPage from '@/views/tasks/TasksPage.vue'
import TaskEdit from '@/views/tasks/TaskEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainMasterPage
    },
    {
      path: '/tasks',
      children: [
        {
          path: '',
          name: 'tasks',
          component: () => import('@/views/tasks/TasksPage.vue')
        },
        {
          path: '/config/:id?',
          name: 'tasks-config',
          component: () => import('../views/tasks/TaskEdit.vue')
        }
      ]
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   meta: {
    //     requireAuth: false,
    //     useInMenu: false
    //   },
    //   component: LoginPage
    // },
    {
      path: '/:path(.*)*',
      name: 'page-not-found',
      meta: {
        requireAuth: true
      },
      component: () => import('../views/PageNotFound.vue')
    }
  ]
})

export default router
