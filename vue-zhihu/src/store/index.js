import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import study from './modules/study'

// 怎么理解store（状态管理）？
// 你可以把store理解成当前应用程序的“数据仓库”“数据银行”
export default new Vuex.Store({
  // modules
  // 作用：从vue项目管理的角度来思考，当多人协同开发时，我们希望把这个根store拆分成多个子store。好处是多人开发时彼此不干扰，其次便于代码的维护。
  modules: {
    study
  }
})
