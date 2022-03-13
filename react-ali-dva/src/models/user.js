import { fetchUserList } from '../services/example'

export default {
  // 子model的命名空间
  namespace: 'user',
  // 可共享的状态变量
  state: {
    list: []
  },
  // 订阅，默认自动运行
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('user model setup')
      // dispatch({type:'getList',payload:{page:1,size:2}})
    },
  },
  // 用于和异步行为交互的，相当于vuex中的actions
  // call(异步方法, {参数列表})
  // put({type:'',payload:''}) 实际它就是dispatch
  effects: {
    *getList({ payload }, { call, put }) {  // eslint-disable-line
      console.log('来自页面的参数payload', payload)
      const list = yield call(fetchUserList, payload)
      console.log('调接口成功', list)
      // 在这里，这个 type 不要加“命名空间”
      yield put({ type:'updateList', payload:list });
    },
  },
  // 用于修改state变量，相当于vuex中的mutations
  // 注意：修改state必须采用“深拷贝”，不能直接修改state。
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    updateList(state, {payload}) {
      const newState = { ...state, list: payload }
      return newState
    }
  },

};
