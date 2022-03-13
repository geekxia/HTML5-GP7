import { fetchUserList } from '@/services'

export default {
  namespace: 'user',
  state: {
    list: []
  },
  reducers: {
    updateList(state, {payload}) {
      // 如果immer未开启，只能这样修改state
      // return {...state, list: payload}
      // 如果immer开启了，可以像vuex一样地修改state
      state.list = payload
    }
  },
  effects: {
    *getList({payload}, {call,put}) {
      const list = yield call(fetchUserList, {})
      yield put({type:'updateList', payload:list})
    }
  }
}
