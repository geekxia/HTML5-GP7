import { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Layout from './layout'
import Login from './login'
import { getUserInfo } from '@/store/actions'

const Loading = () => <div>Loading...</div>

export default () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { token, userInfo } = useSelector(state=>state.admin)

  // 只在登录成功并且userInfo存在时执行
  useEffect(()=>{
    if (pathname==='/login' && userInfo._id) {
      // 登录成功跳转首页大屏
      history.replace('/dashboard')
    }
  }, [userInfo])

  // 在“刷新流程”中执行，在“登录流程”中也执行
  useEffect(()=>{
    if (token && !userInfo._id) dispatch(getUserInfo())
  }, [token])

  return (
    <Switch>
      {
        token
        ? <Route path='/' render={()=>userInfo._id?<Layout/>:<Loading/>} />
        : [
          <Route key='1' path='/login' component={Login} />,
          <Redirect key='2' from='/*' to='/login' />
        ]
      }
    </Switch>
  )
}

// 登录流程：
//   =>用户点击“登录”按钮
//   =>dispatch(login(data))
//   =>把token放进store和localStorage中
//   =>在login成功dispatch(getUserInfo())
//   =>把userInfo放在store中
//   =>跳转进入系统首页
//   =>使用用户信息（role）初始化<Layout>布局（Menu生成、Route生成）
//   =>首页展示完成

// 刷新流程：
  // =>当用户执行刷新时（store中除了token外，其它数据都丢失）
  // =>在Layout的外部（这里System）中触发dispatch(getUserInfo())
  // =>把用户信息放进store
  // =>使用用户信息（role）初始化<Layout>布局（Menu生成、Route生成）
  // =>显示当前url所对应的页面
