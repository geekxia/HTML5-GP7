import { fetchQqList } from '@/api'

// state
// 作用：用于定义可共享的数据（响应式的）
// 特点：当state发生变化时，那些使用了state的视图组件会自动更新。
const state = {
  count: 1,
  list: []
}

// mutations
// 作用：vuex官方建议的一种用于修改state的方式
// 语法：在mutations中可以封装很多个用于修改state方法，其语法 xxxState(state,payload)
// 使用：在vue组件中，this.$store.commit('xxxState', '数据')
// 注意：mutations方法用于同步地更新state，不建议使用异步逻辑，比如定时器或调接口。为什么不建议使用异步逻辑呢？原因是devtools识别不了。
const mutations= {
  changeCount(state, payload) {
    if (payload.type==='add') {
      state.count += payload.step
    } else {
      state.count -= payload.step
    }
  },
  updateList(state, payload) {
    state.list = payload
  }
}

// actions
// 作用：vuex官方建议的一种用于与后端通信的方式
// 语法：在actions封装各种调接口的方法，其语法 xxxFetchApi(store, payload)
// 使用：actions方法用于调接口，在组件中 this.$store.dispatch('xxxFetchApi', '数据')
// 注意：我们只是建议actions方法用于调接口，事实上在actions方法也可以直接修改state。
const actions = {
  getList (store, payload) {
    fetchQqList(payload).then(res=>{
      console.log('vuex 音乐接口', res)
      store.commit('updateList', res.hotkey)
    })
  }
}

// getters
// 作用：相当于是vue的computed计算属性，常常用于对state变量进行二次计算。
// 特点1：当getters方法所关联的state变量发生变化时，getters方法才会重新计算。
// 特点2：子store的getters默认在根store的getters上可以直接访问（给人感觉貌似没有拆分）。
// 语法：xxxCal(state)
const getters = {
  musicLeng(state) {
    return state.list.length
  }
}

export default {
  // 开启子store命名空间，彻底地把多个子store独立开来。
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
