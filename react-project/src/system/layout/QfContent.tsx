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
      <div className='qf-footer'>ειεΊε</div>
    </Content>
  )
}
