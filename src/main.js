import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import htp from './axios/axios'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.config.performance = true
Vue.prototype.$htp = htp;

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app;
