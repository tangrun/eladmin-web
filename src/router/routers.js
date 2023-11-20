import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
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
    redirect: '/homePage',
    // redirect: '/dashboard',
    children: [
      {
        path: 'homePage',
        component: (resolve) => require(['@/views/a/HomePage.vue'], resolve),
        name: 'HomePage',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
      // , {
      //   path: 'dashboard',
      //   component: (resolve) => require(['@/views/home'], resolve),
      //   name: 'Dashboard',
      //   meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      // }
    ]
  },
  {
    path: '/registration',
    component: (resolve) => require(['@/views/registration/Layout.vue'], resolve),
    redirect: '/registration/index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/registration/index.vue'], resolve),
        hidden: true,
        name: 'RegistrationIndex',
        meta: { title: '注册', icon: 'index', affix: false, noCache: false }
      },
      {
        path: 'competent',
        component: (resolve) => require(['@/views/registration/competent/Apply.vue'], resolve),
        hidden: true,
        name: 'CompetentOrganRegistration',
        meta: { title: '主管机构注册', icon: 'index', affix: false, noCache: true }
      }, {
        path: 'socia',
        component: (resolve) => require(['@/views/registration/social/Apply.vue'], resolve),
        hidden: true,
        name: 'SocialOrganRegistration',
        meta: { title: '社会组织注册', icon: 'index', affix: false, noCache: false }
      },
      {
        path: 'expert',
        component: (resolve) => require(['@/views/registration/expert/Apply.vue'], resolve),
        hidden: true,
        name: 'ExpertRegistration',
        meta: { title: '专家注册', icon: 'index', affix: false, noCache: true }
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
