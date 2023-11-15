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
    component: (resolve) => require(['@/views/a/registration/RegistrationContainer.vue'], resolve),
    redirect: '/registration/index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/a/registration/RegistrationIndex.vue'], resolve),
        hidden: true,
        name: 'registrationIndex',
        meta: { title: '注册', icon: 'index', affix: false, noCache: false }
      },
      {
        path: 'sociaApply',
        component: (resolve) => require(['@/views/a/registration/SocialApply.vue'], resolve),
        hidden: true,
        name: 'SocialApply',
        meta: { title: '社会组织注册', icon: 'index', affix: false, noCache: false }
      },
      {
        path: 'expertApply',
        component: (resolve) => require(['@/views/a/registration/ExpertApply.vue'], resolve),
        hidden: true,
        name: 'ExpertApply',
        meta: { title: '专家注册', icon: 'index', affix: false, noCache: true }
      }, {
        path: 'competentApply',
        component: (resolve) => require(['@/views/a/registration/CompetentApply.vue'], resolve),
        hidden: true,
        name: 'CompetentApply',
        meta: { title: '主管机构注册', icon: 'index', affix: false, noCache: true }
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
