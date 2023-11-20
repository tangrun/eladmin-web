import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'

// 数据字典
import dict from './components/Dict'

// 权限指令
import checkPer from '@/utils/permission'
import permission from './components/Permission'
import './assets/styles/element-variables.scss'

// global css
import './assets/styles/index.scss'

import App from './App'
import store from './store'
import router from './router/routers'

import './assets/icons' // icon
import './router/index'
import { filterAsyncRouter } from '@/store/modules/permission' // permission control

Vue.use(checkPer)
Vue.use(permission)
Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

const routes = [
  {
    alwaysShow: false,
    path: '/user',
    component: 'Layout',
    meta: { icon: 'system', noCache: true, title: '用户管理' },
    children: [
      {
        path: 'list',
        component: 'a/user/UserList',
        name: 'UserList',
        meta: { icon: 'system', noCache: true, affix: false, title: '用户管理' }
      }
    ]
  },
  {
    alwaysShow: true,
    path: '/registrationAudit',
    component: 'Layout',
    meta: { icon: 'system', noCache: true, title: '注册审核' },
    redirect: '/registration/index',
    children: [
      {
        path: '/competent/applyList',
        component: 'registration/competent/ApplyList',
        name: 'CompetentOrganRegistrationAudit',
        meta: { title: '主管机构注册审核', icon: 'index', affix: false, noCache: true }
      },
      {
        path: '/social/applyList',
        component: 'registration/social/ApplyList',
        name: 'SocialOrganRegistrationAudit',
        meta: { title: '社会组织注册审核', icon: 'index', affix: false, noCache: true }
      },
      {
        path: '/expert/applyList',
        component: 'registration/expert/ApplyList',
        name: 'ExpertOrganRegistrationAudit',
        meta: { title: '评审专家注册审核', icon: 'index', affix: false, noCache: true }
      }
    ]
  },
  {
    alwaysShow: true,
    path: '/projectPlan',
    meta: { icon: 'system', noCache: true, title: '项目计划' },
    component: 'Layout',
    children: [
      {
        path: 'publish',
        component: 'a/project/CreatePlanProject',
        name: 'CreatePlanProject',
        meta: { title: '项目发布' }
      },
      {
        path: 'list',
        meta: { title: '计划列表' },
        component: 'project/projectPlan/index',
        name: 'ProjectPlan'
      }
    ]
  },
  {
    alwaysShow: true,
    path: '/project',
    meta: { icon: 'system', noCache: true, title: '项目管理' },
    component: 'Layout',
    children: [
      {
        path: 'publish',
        component: 'a/project/CreateProject',
        name: 'CreateProject',
        meta: { title: '项目申报' }
      },
      {
        path: 'application',
        component: 'project/application/index',
        name: 'ProjectApplication',
        meta: { title: '项目情况' }
      },
      {
        path: '/plan',
        meta: { title: '项目目标' },
        component: 'project/application',
        name: 'ProjectListForApplicationPlan'
      },
      {
        path: '/plan/:id',
        meta: { title: '项目目标详情' },
        hidden: true,
        component: 'project/plan',
        name: 'ProjectApplicationPlan'
      },
      {
        path: '/experience',
        meta: { title: '项目经验' },
        component: 'project/application',
        name: 'ProjectListForExperience'
      },
      {
        path: '/experience/:id',
        meta: { title: '项目经验详情' },
        hidden: true,
        component: 'project/experience',
        name: 'ProjectExperience'
      },
      {
        path: '/applicationTeam',
        meta: { title: '项目团队' },
        component: 'project/application',
        name: 'ProjectListForApplicationTeam'
      },
      {
        path: '/applicationTeam/:id',
        meta: { title: '项目团队详情' },
        hidden: true,
        component: 'project/applicationTeam',
        name: 'ProjectApplicationTeam'
      },
      {
        path: '/applicationBudget',
        meta: { title: '项目预算' },
        component: 'project/application',
        name: 'ProjectListForApplicationBudget'
      },
      {
        path: '/applicationBudget/:id',
        meta: { title: '项目预算详情' },
        hidden: true,
        component: 'project/applicationBudget',
        name: 'ProjectApplicationBudget'
      },
      {
        path: '/self',
        meta: { title: '项目自评记录' },
        component: 'project/application',
        name: 'ProjectListForSelf'
      },
      {
        path: '/self/:id',
        meta: { title: '项目自评详情' },
        hidden: true,
        component: 'project/applicationBudget',
        name: 'ProjectSelf'
      },
      {
        path: '/supervise',
        meta: { title: '项目督导记录' },
        component: 'project/application',
        name: 'ProjectListForSupervise'
      },
      {
        path: '/supervise/:id',
        meta: { title: '项目督导详情' },
        hidden: true,
        component: 'project/supervise',
        name: 'ProjectSupervise'
      },
      {
        path: '/change',
        meta: { title: '项目变更记录' },
        component: 'project/application',
        name: 'ProjectListForChange'
      },
      {
        path: '/change/:id',
        meta: { title: '项目变更详情' },
        hidden: true,
        component: 'project/change/index',
        name: 'ProjectChange'
      },
      {
        path: '/publicize',
        meta: { title: '媒体宣传记录' },
        component: 'project/application',
        name: 'ProjectListForPublicize'
      },
      {
        path: '/publicize/:id',
        meta: { title: '媒体宣传详情' },
        hidden: true,
        component: 'project/publicize/index',
        name: 'ProjectPublicize'
      },
      {
        path: '/active',
        meta: { title: '活动记录' },
        component: 'project/application',
        name: 'ProjectListForActive'
      },
      {
        path: '/active/:id',
        meta: { title: '活动详情' },
        hidden: true,
        component: 'project/active/index',
        name: 'ProjectActive'
      }
    ]
  }
]

// const sdata = JSON.parse(JSON.stringify(routes))
// const rdata = JSON.parse(JSON.stringify(routes))
// const sidebarRoutes = filterAsyncRouter(sdata)
// const rewriteRoutes = filterAsyncRouter(rdata, false, true)
// rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
//
// store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
//   router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
// })
// store.dispatch('SetSidebarRouters', sidebarRoutes)
