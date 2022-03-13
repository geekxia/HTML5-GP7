const state = {
  token: '',
  userinfo: {},
  count: 1
}

const mutations = {
  changeCount(state, payload) {
    state.count += payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
