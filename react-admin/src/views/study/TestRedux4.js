import { useReducer } from 'react'
import { useQfSelector1, useQfDispatch } from './qf'
import { countChange } from '@/store/actions'

// 学习useReducer()
//  在React函数式组件中,除了使用useState()定义声明式变量,还可以使用useReducer()来定义声明式变量.
const Demo = () => {
  const [state, dispatch] = useReducer((state,action)=>{
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
      case 'add':
        newState.num+=action.payload
        break
      case 'sub':
        newState.num+=action.payload
        break
      default:
    }
    return newState
  }, {num:1})
  return (
    <div>
      <h1>{ state.num }</h1>
      <button onClick={()=>dispatch({type:'add',payload:5})}>自增</button>
      <button onClick={()=>dispatch({type:'sub',payload:-5})}>自减</button>
    </div>
  )
}

export default () => {
  const msg = useQfSelector1(state=>state.study.msg)
  const dispatch = useQfDispatch()
  return (
    <div>
      <h1>{ msg }</h1>
      <button onClick={()=>dispatch(countChange(-1))}>修改MSG</button>
    </div>
  )
}
