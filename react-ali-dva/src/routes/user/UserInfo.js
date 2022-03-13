import React from 'react'

export default props => {
  console.log('UserInfo props', props)
  const { match } = props
  return (
    <div>
      <h1>用户详情</h1>
      <h1>当前用户的ID是：{match.params.id}</h1>
    </div>
  )
}
