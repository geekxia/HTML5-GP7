import Vue from 'vue'

// 使用cookie
import Cookies from 'js-cookie'

// 样式重置
import 'normalize.css/normalize.css'

// 集成Element
import Element from 'element-ui'
import './styles/element-variables.scss'
// 国际化（默认是英文版）
// import enLang from 'element-ui/lib/locale/lang/en'

// 把element中所有组件都变成全局组件
Vue.use(Element, {
  // 设置element-ui的组件的大小尺寸
  size: Cookies.get('size') || 'medium'
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 全局样式
import '@/styles/index.scss' // global css

// 根组件、store和router。
import App from './App'
import store from './store'
import router from './router'

// 把icons变成变成组件<svg-icon>
import './icons' // icon
// 执行permission.js文件（路由守卫，权限设计）
// 注意：permission.js 必须在 new Vue({router})挂载之前运行。
import './permission'
import './utils/error-log' // error log

// 自定义全局过滤器
import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 启动mock服务，模拟假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

import api from '@/api'
Vue.prototype.$api = api

import img from '@/utils/img'
Vue.prototype.$img = img

// 全局指令
import permission from '@/directive/permission'
Vue.use(permission)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
