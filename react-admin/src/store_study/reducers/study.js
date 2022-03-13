import produce from 'immer'
import { COUNT_CHANGE } from '../actions'

// 初始化可共享的状态数据
const initState = {
  msg: 1
}

// action = { type, payload }
export default function (state=initState, {type,payload}) {
  console.log('有信号来了', type, payload)
  return produce(state, state=>{
    switch (type) {
      case COUNT_CHANGE:
        state.msg+=payload
        break
      default:
    }
  })
}
