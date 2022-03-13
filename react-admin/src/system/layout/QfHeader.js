import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Layout, Button } from 'antd'
import { logout } from '@/store/actions'
const { Header } = Layout

export default () => {
  const dispatch = useDispatch()
  return (
    <Header style={{ padding:0,textAlign:'right' }}>
      <Button onClick={()=>dispatch(logout())} type='primary'>退出登录</Button>
    </Header>
  )
}
