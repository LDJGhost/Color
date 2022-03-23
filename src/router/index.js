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
  },
  {
    path: '/courseInfo',
    name: 'courseInfoIndex',
    component: () => import('@/views/home/courseInfo')
  },
  {
    path: '/detailInfo',
    name: 'detailInfoIndex',
    component: () => import('@/views/discipline/detailInfo')
  },
  {
    path: '/commentStatistics',
    name: 'commentStatisticsIndex',
    component: () => import('@/views/home/commentStatistics')
  },
  {
    path: '/finalExam',
    name: 'finalExamIndex',
    component: () => import('@/views/home/finalExam')
  },
  {
    path: '/finalReport',
    name: 'finalReportIndex',
    component: () => import('@/views/home/finalReport')
  },
  {
    path: '/finalReportDetail',
    name: 'finalReportDetailIndex',
    component: () => import('@/views/home/finalReportDetail')
  },
  {
    path: '/examApprove',
    name: 'examApproveIndex',
    component: () => import('@/views/home/examApprove')
  },
  {
    path: '/examApproveDetail',
    name: 'examApproveDetailIndex',
    component: () => import('@/views/home/examApproveDetail')
  },
  {
    path: '/createCourse',
    name: 'createCourseIndex',
    component: () => import('@/views/home/createCourse')
  },
  {
    path: '/createAssociation',
    name: 'createAssociationIndex',
    component: () => import('@/views/home/createAssociation')
  },
  {
    path: '/commentCourse',
    name: 'commentCourseIndex',
    component: () => import('@/views/discipline/commentCourse')
  },
  {
    path: '/courseList',
    name: 'courseListIndex',
    component: () => import('@/views/home/courseList')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
