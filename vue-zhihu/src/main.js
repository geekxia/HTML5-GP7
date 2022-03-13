// 入口文件
import Vue from 'vue'
// 根组件
import App from './App.vue'

// 如果项目上线，关闭掉vue的报错等提示
Vue.config.productionTip = false

import router from '@/router'
import store from '@/store'

import api from '@/api'
Vue.prototype.$api = api

new Vue({
  render: h => h(App),
  el: '#app',
  router,  // 挂载路由系统
  store
})
