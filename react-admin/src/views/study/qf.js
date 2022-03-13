import React, { useState, useEffect, useReducer } from 'react'
import { ReactReduxContext } from 'react-redux'
import store from '@/store'
// store.getState()  用于获取store中所有的state
// store.subscribe() 用于添加一个change事件，监听store变化
// store.dispatch()  用于派发一个action

function qfconnect1(mapStateToProps, mapDispatchToProps) {
  // do something
  const actions = mapDispatchToProps(store.dispatch)
  console.log('actions', actions)

  return function (C) {
    // 高阶组件一定要返回一个新的组件(而不是新的JSX)
    return props => {
      const [state, setState] = useState(mapStateToProps(store.getState()))
      useEffect(()=>{
        // 监听store的变化,每当store变化时,回调函数就会执行
        const unsubcrible = store.subscribe(()=>{
          const newState = store.getState()
          setState(mapStateToProps(newState))
        })
        return () => unsubcrible()
      }, [])
      return (
        <C {...props} {...actions} {...state} />
      )
    }
  }
}

function qfconnect2(mapStateToProps, mapDispatchToProps) {
  const actions = mapDispatchToProps(store.dispatch)
  return function(C) {
    class NewC extends React.PureComponent {
      componentDidMount() {
        const { store } = this.context
        store.subscribe(()=>{
          this.forceUpdate()
        })
      }

      render() {
        console.log('qfconnect1 ctx', this.context.store)
        const { store } = this.context
        const state = mapStateToProps(store.getState())
        return (
          <C {...this.props} {...actions} {...state} />
        )
      }
    }
    NewC.contextType = ReactReduxContext
    return NewC
  }
}

// const dispatch = useDispatch()
function useQfDispatch() {
  return store.dispatch
}

function useQfSelector1(fn) {
  const [state, setState] = useState(fn(store.getState()))
  useEffect(()=>{
    const unsubcrible = store.subscribe(()=>{
      setState(fn(store.getState()))
    })
    return ()=>unsubcrible()
  }, [store])
  return state
}

function useQfSelector2(fn) {
  const [,dispatch] = useReducer(s=>s+1, 0)
  useEffect(()=>{
    const unsubcrible = store.subscribe(()=>dispatch())
    return ()=>unsubcrible()
  }, [store])
  return fn(store.getState())
}

export {
  qfconnect1,
  qfconnect2,
  useQfDispatch,
  useQfSelector1,
  useQfSelector2
}
