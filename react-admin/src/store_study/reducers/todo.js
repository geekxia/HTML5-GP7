import produce from 'immer'
import { TODO_LIST, TODO_COUNT } from '../actions'

const initState = {
  list: [],
  undone: [],
  done: [],
  count: 0
}

export default function (state=initState, {type,payload}) {
  return produce(state, state=>{
    switch (type) {
      // case TODO_ADD:
      //   state.list.push(payload)
      //   break
      // case TODO_DEL:
      //   state.list = state.list.filter(ele=>ele.id!==payload)
      //   break
      // case TODO_EDIT:
      //   state.list.map((ele,idx,arr)=>{
      //     if (payload.id===ele.id) arr[idx].task = payload.task
      //   })
      //   break
      // case TODO_STATUS:
      //   state.list.map((ele,idx,arr)=>{
      //     if (ele.id===payload) arr[idx].status = (ele.status+1)%2
      //   })
      //   break
      case TODO_LIST:
        state.done = payload.done
        state.undone = payload.undone
        break
      case TODO_COUNT:
        state.count++
        break
      default:
    }
  })
}
