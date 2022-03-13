import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Tabbar from './Tabbar'
import routes from '@/views'
import { useTab } from '@/hooks'
import tabs from './tabs'

import './style.scss'

// Switch必须是Route、Redirect的直接父组件。那么Switch有什么作用？加快路由匹配的速度。
// Redirect，用于重定向，和Route是兄弟关系，一般放在Route之后。

export default () => {
  const [flag] = useTab(tabs)

  const renderRoutes = () => {
    console.log('-')
    return routes.map(ele=>(
      <Route
        exact={ele.exact}
        key={ele.id}
        path={ele.path}
        component={ele.component}
      />
    ))
  }
  return (
    <div className='qf-layout'>
      <Switch>
        { renderRoutes() }
        <Redirect from='*' to='/' />
      </Switch>

      { flag && <Tabbar /> }
    </div>
  )
}
