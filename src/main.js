// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {
  routes
} from './routes'
import axios from 'axios'
import {
  store
} from './store/store.js'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.prototype.$axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://www.314web.cn/pei/public/index.php/api/'
//token刷新axios劫持
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    alert('账号在其他地方登录或网络请求失败，请重新登录')
    store.commit("userStatus", "");
    router.push({
      name: "loginLink"
    });
    return Promise.reject(error)
  }
)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/dingPT/'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)

})
