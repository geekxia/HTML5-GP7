import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/hooks'
import { getInfo } from '@/store/reducers/user'

import Layout from './layout'
import Login from './login'

import { elements, routes } from '@/views'

export default () => {
  const dispatch = useAppDispatch()
  // 从状态管理中取出token，和当前拥有可以访问的菜单列表（二维数组）
  const { token, menuArr } = useAppSelector(state=>state.user)

  // 获取路由api和url信息
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // 在登录流程中、刷新流程都会执行
  useEffect(()=>{
    if (token && menuArr.length>0) navigate(pathname==='/login'?'/':pathname)
  }, [menuArr])

  // 在登录流程不执行
  // 在刷新流程中也行执行
  // 在退出登录时执行
  // 当token存在时，pathname变化，不执行
  // 当token不存在时，pathname变化，执行
  useEffect(()=>{
    if (!token) {
      console.log('token不存在', token)
      navigate('/login', {replace:true})
    }
  }, [token, pathname])

  // 只有刷新流程中执行（根据token获取用户信息）
  useEffect(()=>{
    if (token && menuArr.length===0) dispatch(getInfo())
  }, [menuArr])

  // 渲染有权限的路由
  const renderRoute = arr => {
    let result = []
    arr.map(ele=>{
      if (ele.children) {
        ele.children.map(ele=>{
          console.log('ele', ele)
          result.push(
            <Route
              key={ele._id}
              path={ele.path.slice(1)}
              element={elements[ele.component]}
            />
          )
        })
      }
    })
    return result
  }

  // 渲染静态的路由（这些url所有用户都能访问）
  const renderContantRoute = arr => {
    return arr.map(ele=>(
      <Route
        key={ele.id}
        path={ele.path}
        element={ele.element}
      />
    ))
  }

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Layout />}>
        { menuArr.length>0 && renderRoute(menuArr)}
        { renderContantRoute(routes) }
      </Route>
    </Routes>
    </>
  )
}



// 待解决的BUG:
// 1、当前文件如果以.tsx结尾，报一个 TS（Element赋值给never）
// 2、内部系统中“重定向问题”（已实现，待进一步测试）
// 3、在没有token（未登录状态下）访问内部页面跳转到/login（已实现，待进一步测试）
// 4、在刷新内部系统页面中，保留Menu的高亮样式（还没有实现）

// <Route path='*' element={<Navigate to='/article/list' />} />
