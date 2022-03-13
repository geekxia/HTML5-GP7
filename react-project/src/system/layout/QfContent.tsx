import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

const { Content } = Layout

export default () => {

  return (
    <Content>
      <div className='qf-content'>
        <Outlet />
      </div>
      <div className='qf-footer'>千锋出品</div>
    </Content>
  )
}
