import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  messageList: [],
  userinfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MESSAGE: (state, list) => {
    state.messageList = list
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  }
}

const actions = {
  // 登录 await store.dispatch('user/login')
  // 调登录接口：接收上游传递过来的表单数据，调login接口
  login({ commit }, payload) {
    // const { username, password } = payload
    return new Promise((resolve, reject) => {
      // 开始真正调接口
      login(payload).then(data => {
        const { token } = data
        // 把login登录成功返回的token放进vuex中
        commit('SET_TOKEN', token)
        // 把login登录成功返回的token放进Cookie中
        setToken(token)
        // 给.then()使用
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息（roles）
  // 这个接口在什么时候调用？当有token但没有用户信息时调用。
  // 路由守卫：在登录流程中，在刷新流程中。
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 真正调接口获取用户信息
      // 注意：这个作者是用query参数的方式向后端传递token的
      getInfo({}).then(data => {
        const { userinfo, message_list } = data
        // 如果data不存在，这说明token要么是假的，要么过期了。
        // 注意：为了配合这个异常，当拿不到用户信息时，希望data是null/undefined
        if (!userinfo) {
          reject('Verification failed, please Login again.')
        }
        // 在这里肯定拿到了用户信息
        const { roles, name, avatar, introduction } = userinfo
        // 注意：roles必须是一个“非空数组”，像这样 ['admin']
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        // 把用户信息都放进vuex中（用户不要放进Cookie或localStoraget）
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_MESSAGE', message_list)
        commit('SET_USERINFO', userinfo)
        // 给.then()使用
        resolve(userinfo)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录：清除token、清除角色信息、重置路由、清除各种缓存
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {

      // 把vuex中的token和角色信息清除
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      // 把Cookie中的token清除
      removeToken()
      // 重置路由（*）
      resetRouter()
      // reset visited views and cached views
      // 把vuex中tagViews、缓存的视图都清除。
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()

      // 调接口退出登录，入参是token
      // logout(state.token).then(() => {
      //
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 重置token和角色信息
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 改变用户角色
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')
    resetRouter()
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    router.addRoutes(accessRoutes)
    // 重置缓存中的tagView和缓存的视图
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
