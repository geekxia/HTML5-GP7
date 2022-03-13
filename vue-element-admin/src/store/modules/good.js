export default {
  namespaced: true,
  state: {
    cates: []
  },
  mutations: {
    updateGoodCates(state,payload) {
      state.cates = payload
    }
  }
}
