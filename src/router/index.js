import { createRouter, createWebHashHistory } from 'vue-router'

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/discipline',
        name: 'discipline',
        component: () => import('@/views/discipline/')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
