import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LessonsView from '../views/LessonsView.vue'
import LessonsPlanView from '../views/LessonsPlanView.vue'
import LessonsSelectView from '../components/LessonsSelectView.vue'
import TeachersView from '../views/TeachersView.vue'
import TeachersSelectView from '../components/TeachersSelectView.vue'
import LoginView from '../views/LoginView.vue'
import PageNotFound from '../views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: () => import(/* webpackChunkName: "lessons" */ '../views/LessonsView.vue'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'select',
          name: 'lessons-select',
          component: () =>
            import(/* webpackChunkName: "select" */ '../components/LessonsSelectView.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: ':subjectsId(\\d+)+',
          name: 'teachers-select',
          component: () =>
            import(/* webpackChunkName: "teachersSelect" */ '../components/TeachersSelectView.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: ':lessonsIdsPairs(\\d+-\\d+)+',
          name: 'study-select',
          component: () =>
            import(/* webpackChunkName: "lessonsPlan" */ '../views/LessonsPlanView.vue'),
          props: true,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: () => import(/* webpackChunkName: "teachers" */ '../views/TeachersView.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "notFound" */ '../views/PageNotFound.vue'),
      meta: {
        requireAuth: false
      }
    }
  ]
})

router.beforeEach((to) => {
  const authParams = localStorage.getItem('authParams')
  if (to.meta.requireAuth && !authParams)
    return {
      name: 'login'
    }
})

export default router
