import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'connect',
      component: () => import(/* webpackChunkName: "connect" */ './views/ConnectionInfo.vue')
    },
    {
      path: '/installConfig',
      name: 'install',
      component: () => import(/* webpackChunkName: "install" */ './views/InstallConfig.vue')
    },
    {
      path: '/installProgram',
      name: 'installProgram',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/InstallProgram.vue')
    },
  ]
})
