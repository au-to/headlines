import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import User from '@/pages/User'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import { getToken } from '@/utils/token'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'layout/home'
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: () => import('@/pages/Search')
  },
  {
    path: '/searchresult/:kw',
    component: () => import('@/pages/SearchResult')
  },
  {
    path: '/article-detail',
    component: () => import('@/pages/ArticleDetail')
  },
  {
    path: '/info-edit',
    component: () => import('@/pages/User/InfoEdit.vue')
  },
  {
    path: '/chat',
    component: () => import('@/pages/Chat')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局前置守卫
router.beforeEach((from, to, next) => {
  if (getToken() !== null) {
    // 登录中
    if (next.path === '/login') {
      next(false)
    } else {
      next()
    }
  } else {
    // 未登录
    next()
  }
})

export default router
