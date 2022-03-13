import React from 'react'

// 模拟react-redux中的connect这个高阶组件

export default (mapState, mapActions) => {
  // do something
  const state = mapState()
  const actions = mapActions()
  return C => props => (
    <C {...props} {...state} {...actions} />
  )
}
