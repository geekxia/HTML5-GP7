// 入口文件
// 在vue3.0中为什么不把Vue这个构造器暴露出来？
// 1、避免用户滥用Vue原型链。
// 2、不把Vue暴露出来，Vue中的API都按需加载，减少依赖包的体积。

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.ts'
import store from './store'
import "ant-design-vue/dist/antd.css"
import { Button } from 'ant-design-vue'

// 创建Vue响应式系统
const app = createApp(App)
// 在app放置全局数据(没有响应式的)
app.config.globalProperties.$http = 'http://baidu.com'

app.use(router)
app.use(store)
app.use(Button)  // vant-ui

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})

//

// do something
// 挂载vue响应式系统时，只能使用app.mount()，不支持el选项的挂载。
app.mount('#app')
