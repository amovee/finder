import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookies from "vue-cookies-ts"
 
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.cookies.config({
  expires: 1000 * 60 * 60 * 24 * 356,
  // path?: string,
}) 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
