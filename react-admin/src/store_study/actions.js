import {
  fetchTodoList,
  fetchTodoAdd,
  fetchTodoDel,
  fetchTodoEdit,
  fetchTodoStatus,
} from '@/api'

export const COUNT_CHANGE = 'COUNT_CHANGE'

// 使用redux模块todolist功能
export const TODO_ADD = 'TODO_ADD'
export const TODO_DEL = 'TODO_DEL'
export const TODO_EDIT = 'TODO_EDIT'
export const TODO_STATUS = 'TODO_STATUS'

// 使用ajax实现todolist功能
export const TODO_LIST = 'TODO_LIST'
export const TODO_COUNT = 'TODO_COUNT'

export function countChange(num) {
  return { type: COUNT_CHANGE, payload: num }
}

// action生成器()
export function listTodo(params) {
  return function(dispatch) {
    // 调接口(redux默认不支持异步的action)
    fetchTodoList(params).then(res=>{
      // 把后端api数据派发到store
      console.log('todo res', res)
      dispatch({ type: TODO_LIST, payload:res })
    })
  }
}

export function addTodo(task) {
  return function(dispatch) {
    fetchTodoAdd({task}).then(()=>{
      // 添加todo成功
      // dispatch(listTodo())
      dispatch({type:'TODO_COUNT'})
    })
  }
}

export function delTodo(id) {
  return function(dispatch) {
    fetchTodoDel({id}).then(()=>{
      // dispatch(listTodo())
      dispatch({type:'TODO_COUNT'})
    })
  }
}
export function editTodo({id, new_task}) {
  return function(dispatch) {
    fetchTodoEdit({id,new_task}).then(()=>{
      // dispatch(listTodo())
      dispatch({type:'TODO_COUNT'})
    })
  }
}
export function statusTodo({_id,done}) {
  return function(dispatch) {
    fetchTodoStatus({id:_id,done}).then(()=>{
      // dispatch(listTodo())
      dispatch({type:'TODO_COUNT'})
    })
  }
}
