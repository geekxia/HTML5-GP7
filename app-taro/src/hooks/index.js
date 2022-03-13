import { MobXProviderContext } from 'mobx-react'
import { useContext, useReducer } from 'react'

// useSelector(state=>state.count.counter)
export function useSelector(fn) {
  const ctx = useContext(MobXProviderContext)
  console.log('useStore ctx', ctx)
  return fn(ctx.store)
}

// dispatch({type:'count/increment',payload:2})
export function useDispatch() {
  const [_,force] = useReducer(s=>s+1,0)
  const ctx = useContext(MobXProviderContext)
  const dispatch = ({type,payload}) => {
    const tt = type.split('/')
    // 调用指定子store中的action方法
    const fn = ctx.store[tt[0]][tt[1]](payload)
    // 当store更新已完成时，强制更新组件
    if (fn && (typeof fn.then==='function')) {
      fn.then(()=>force())
    } else {
      force()
    }
  }
  return dispatch
}
