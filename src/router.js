import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/home.vue'

Vue.use(Router)
// 按需加载 component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/manage',
      name: 'manage',
      redirect: '/manage/login',
      component: () => import('./views/manage/index.vue'),
      children:[
        {
          path: '/manage/login',
          name: 'login',
          component: () => import('./views/manage/login.vue'),
        },
        {
          path: '/manage/reset',
          name: 'reset',
          component: () => import('./views/manage/reset/index.vue')
        },
        {
          path: '/manage/reset/auth',
          name: 'manage-reset-auth',
          component: () => import('./views/manage/reset/auth.vue')
        },
        {
          path: '/manage/reset/set',
          name: 'manage-reset-set',
          component: () => import('./views/manage/reset/set.vue')
        },
        {
          path: '/manage/register',
          name: 'register',
          component: () => import('./views/manage/register/index.vue')
        }
      ]
    },
    {
      path: '/agent',
      name: 'agent',
      redirect: '/agent/index',
      component: () => import('./views/footer/index.vue'),
      children: [
        {
          path: '/agent/index',
          name: 'agent-index',
          component: () => import('./views/agent/index.vue')
        }
      ]
    },
    {
      path: '/58BTopics',
      name: '58BTopics',
      redirect: '/58BTopics/index',
      component: () => import('./views/footer/index.vue'),
      children: [
        {
          path: '/58BTopics/index',
          name: '58BTopics-index',
          component: () => import('./views/58BTopics/index.vue')
        }
      ]
    }
  ]
})
