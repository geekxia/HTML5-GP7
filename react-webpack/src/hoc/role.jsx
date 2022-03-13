import React from 'react'
export default roles => {
  // 来自userinfo中的角色信息（来自于状态管理的后端数据）
  const curRole = 'admin'
  // 判断权限
  const flag = roles.includes(curRole)
  return C => props => {
    return (
      flag
      ? <C {...props} role={curRole} />
      : <div>没有权限访问</div>
    )
  }
}
