import React, { useState } from 'react'
import { Layout, Button, Menu, Dropdown } from 'antd'

import { useAppDispatch } from '@/hooks'
import { logout } from '@/store/reducers/user'

const { Header } = Layout

const langArr = [
  { id: 1, value: 'zh-CN', label:'中文' },
  { id: 2, value: 'en-GB', label:'English' },
  { id: 3, value: 'zh-HK', label:'繁体' }
]

const OverlayMenu  = () => {
  const dispatch = useAppDispatch()
  const change = (ele) => {
    dispatch({type:'layout/changeLang',payload:ele.value})
  }
  return (
    <Menu>
    {
      langArr.map(ele=>(
        <Menu.Item key={ele.value} onClick={()=>change(ele)}>
          { ele.label }
        </Menu.Item>
      ))
    }
    </Menu>
  )
}


export default () => {
  const dispatch = useAppDispatch()
  return (
    <Header style={{ padding:0,textAlign:'right' }}>
      <Button onClick={()=>dispatch(logout())} type='primary'>退出登录</Button>
      <Dropdown overlay={<OverlayMenu />} placement="bottomRight">
        <Button type='primary'>语言</Button>
      </Dropdown>
    </Header>
  )
}
