import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import User from '@/pages/User'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
