import React from 'react'
import {
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

// 两个二级页面
import Video from './components/Video'
import Image from './components/Image'

export default () => (
  <div className='qf-find'>
    {/* 二级菜单 */}
    <div>
      <NavLink activeStyle={{color:'red'}} to='/find/video'>视频列表</NavLink>
      <NavLink activeStyle={{color:'red'}} to='/find/image'>图片列表</NavLink>
    </div>

    <Switch>
      <Route path={'/find/video'} component={Video} />
      <Route path={'/find/image'} component={Image} />
      <Redirect from='/find' to='/find/video' />
    </Switch>
  </div>
)
