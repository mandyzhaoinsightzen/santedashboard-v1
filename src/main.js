// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
// 引入状态管理

//import css
import 'vue-beauty/package/style/vue-beauty.min.css'

//import components
import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty)

Vue.config.productionTip = false

// 路由拦截器
router.beforeEach((to, from, next) => {
  if (to.matched.length != 0) {
      if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
          if (Boolean(localStorage.getItem("userInfo"))) { // 通过vuex state获取当前的user是否存在
              next();
          } else {
              next({
                  path: '/login',
                  query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
              })
          }
      } else {
        next();
    //       if (Boolean(localStorage.getItem("userInfo"))) { // 判断是否登录
    //           if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
    //               next();
    //           } else {
    //               /**
    //                * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页
    //                */
    //               next({
    //                   path: '/index'
    //               })
    //           }
    //       } else {
    //           next();
    //       }
    }
  } else {
      next({
          path: '/login',
          query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
      // 空的实例放到根组件下，所有的子组件都能调用
      Bus: new Vue()
  }

})
