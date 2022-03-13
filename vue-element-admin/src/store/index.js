import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 根store
const store = new Vuex.Store({
  modules,
  // 进一步理解这个getters
  // 特点1：子store的getters在根store上也可以正常方法
  // 特点2：相当于是计算属性，是state进行的若干计算，经常需要频繁地访问，所以放在这里（方便访问）
  getters
})

export default store
