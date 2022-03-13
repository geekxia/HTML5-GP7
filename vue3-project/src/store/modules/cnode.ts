import { fetchList } from '@/utils/api'
export default {
  namespaced: true,
  state: {
    msg: 'cnode',
    list: [],
    cates: [
      { id: 1, tab: '', label: '全部' },
      { id: 2, tab: 'good', label: '精华' },
      { id: 3, tab: 'share', label: '分享' },
      { id: 4, tab: 'ask', label: '问答' },
      { id: 5, tab: 'job', label: '招聘' }
    ]
  },
  mutations: {
    updateList(state, payload) {
      state.list = payload
      // state.list = JSON.parse(JSON.stringify(state.list))
    }
  },
  actions: {
    getList({commit}, params) {
      fetchList(params).then(list=>{
        console.log('文章列表', list)
        commit('updateList', list)
      })

    }
  }
}
