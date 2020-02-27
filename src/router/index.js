import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login'
import register from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login,
      meta: {
        requireAuth: false
     }
  },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        requireAuth: true
     }
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: register
    // },
    // {
    //   path: '/forgotenpassword',
    //   name: 'ForgotenPassword',
    //   component: ForgotenPassword
    // },
  ]
})
