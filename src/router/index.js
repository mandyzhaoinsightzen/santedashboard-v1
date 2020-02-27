import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login'
import organization from '@/views/organization'
import user from '@/views/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login,
      meta: {
        requireAuth: false,
        keepAlive: false
     }
  },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        requireAuth: true,
        keepAlive: true
     }
    },
    {
      path: '/organization',
      name: 'organization',
      component: organization,
      meta: {
        requireAuth: true,
        keepAlive: true
     }
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta: {
        requireAuth: true,
        keepAlive: true
     }
    },
  ]
})
