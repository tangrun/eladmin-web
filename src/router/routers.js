import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
import Registration from '@/views/a/registration/index.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/registration',
    component: Registration,
    children: [
      {
        path: 'sociaApply',
        component: (resolve) => require(['@/views/a/registration/SocialApply.vue'], resolve),
        name: 'SocialApply',
        meta: { title: '社会组织注册', icon: 'index', affix: true, noCache: true }
      },
      {
        path: 'expertApply',
        component: (resolve) => require(['@/views/a/registration/ExpertApply.vue'], resolve),
        name: 'ExpertApply',
        meta: { title: '专家注册', icon: 'index', affix: true, noCache: true }
      }, {
        path: 'competentApply',
        component: (resolve) => require(['@/views/a/registration/CompetentApply.vue'], resolve),
        name: 'CompetentApply',
        meta: { title: '主管机构注册', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
