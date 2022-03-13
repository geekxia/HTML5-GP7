import { fetchGoodList } from '@/api'
import deepCopy from '@/utils/copy'

export default {
  namespaced: true,
  state: {
    cache: {}
  },
  mutations: {
    updateCache(state, payload) {
      const {idx,list} = payload
      // idx 从view中来
      // list 从后端来
      state.cache[idx] = list
      // 强制深复制一次
      // state.cache = JSON.parse(JSON.stringify(state.cache))
      state.cache = deepCopy(state.cache)
    },
    cleanCache(state) {
      state.cache = {}
    }
  },
  actions: {
    getList(store, payload) {
      const { idx, cate } = payload
      // idx,cate来自于view
      fetchGoodList({cate}).then(res=>{
        store.commit('updateCache', {idx,list:res.list})
      })
    }
  }
}
