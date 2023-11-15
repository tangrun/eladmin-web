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
    alwaysShow: true,
    path: '/project',
    meta: { icon: 'system', noCache: true, title: '项目管理' },
    component: 'Layout',
    children: [
      {
        path: 'publish',
        component: 'a/project/CreateProject',
        name: 'CreateProject',
        meta: { title: '项目发布' }
      },
      // {
      //   path: 'create',
      //   component: 'a/project/CreateProject',
      //   hidden: true,
      //   name: 'CreateProject',
      //   meta: { title: '项目创建', icon: 'index', affix: true, noCache: true }
      // },
      // {
      //   path: 'detail/:id',
      //   component: 'a/project/ProjectDetail',
      //   hidden: true,
      //   name: 'CreateProject',
      //   meta: { title: '项目详情', icon: 'index', affix: true, noCache: true }
      // },
      // {
      //   path: 'createPlan',
      //   component: 'a/project/CreatePlanProject',
      //   hidden: true,
      //   name: 'CreatePlanProject',
      //   meta: { title: '储备项目创建', icon: 'index', affix: true, noCache: true }
      // },
      {
        path: '/plan',
        meta: { title: '项目目标列表' },
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
        meta: { title: '项目经验列表' },
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
        meta: { title: '项目团队列表' },
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
        meta: { title: '项目预算列表' },
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
        meta: { title: '项目自评记录列表' },
        component: 'project/application',
        name: 'ProjectListForSelf'
      },
      {
        path: '/self/:id',
        meta: { title: '项目自评记录详情' },
        hidden: true,
        component: 'project/applicationBudget',
        name: 'ProjectSelf'
      },
      {
        path: '/supervise',
        meta: { title: '项目督导记录列表' },
        component: 'project/ProjectList',
        name: 'ProjectListForSupervise'
      },
      {
        path: '/supervise/:id',
        meta: { title: '项目督导记录详情' },
        hidden: true,
        component: 'project/supervise',
        name: 'ProjectSupervise'
      }
    ]
  },
  {
    path: '/registration',
    component: 'a/registration/RegistrationContainer',
    hidden: true,
    redirect: '/registration/index',
    children: [
      {
        path: 'index',
        component: 'a/registration/RegistrationIndex',
        hidden: true,
        name: 'registrationIndex',
        meta: { title: '注册', icon: 'index', affix: false, noCache: true }
      },
      {
        path: 'sociaApply',
        component: 'a/registration/SocialApply',
        hidden: true,
        name: 'SocialApply',
        meta: { title: '社会组织注册', icon: 'index', affix: false, noCache: true }
      },
      {
        path: 'expertApply',
        component: 'a/registration/ExpertApply',
        hidden: true,
        name: 'ExpertApply',
        meta: { title: '专家注册', icon: 'index', affix: false, noCache: true }
      }, {
        path: 'competentApply',
        component: 'a/registration/CompetentApply',
        hidden: true,
        name: 'CompetentApply',
        meta: { title: '主管机构注册', icon: 'index', affix: false, noCache: true }
      }
    ]
  }
]

const sdata = JSON.parse(JSON.stringify(routes))
const rdata = JSON.parse(JSON.stringify(routes))
const sidebarRoutes = filterAsyncRouter(sdata)
const rewriteRoutes = filterAsyncRouter(rdata, false, true)
rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
  router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
})
store.dispatch('SetSidebarRouters', sidebarRoutes)
