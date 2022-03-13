import { fetchLogin, fetchUserInfo } from '@/api'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    userinfo: {}
  },
  mutations: {
    updateToken(state, token) {
      state.token = token
    },
    updateUserInfo(state, payload) {
      state.userinfo = payload
    }
  },
  actions: {
    login({commit}, data) {
      return new Promise(resolve=>{
        fetchLogin(data).then(res=>{
          commit('updateToken', res.token)
          localStorage.setItem('token', res.token)
          resolve()
        })
      })
    },
    getUserInfo() {
      return new Promise(resolve=>{
        fetchUserInfo().then(res=>{
          // commit('updateUserInfo', res.userinfo)
          resolve(res)
        })
      })
    }
  }
}

// 如果用户未登录，当用户使用那些需要鉴权的功能时，我们使用v-auth实现跳转到登录页。
// 如果用户没有账号，通过交互指引用于去注册页面进行用户注册。
// 注册成功就可以登录了，登录login走vuex流程，把token放在localStorage或vuex中。
// 这时，当用于再次使用那些需要鉴权的功能时，就不会被拦截了。
// 如果用户需要调用一些有权限的接口时，在请求拦截器中添加token传递给后端，后端就知道我的身份了。
