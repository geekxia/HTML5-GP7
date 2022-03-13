import React from 'react'
import { inject, observer } from 'mobx-react'
// inject('参数')(UI) 从上下文中取出数据，注入到当前组件的props上
// observer(UI) 把当前组件变成观察者，当store数据发生变化时，组件将会自动更新

// 注意：inject必须套在observer的外面。怎么记？先做人（成为观察者）再做事（使用store数据写业务）。

// @inject('study')
// @observer
// class Home extends PureComponent {}

import { Button } from 'antd-mobile'

export default inject('study')(
  observer(
    ({ study }) => {
      const handle = step => {
        study.changeNum(step)
      }

      return (
        <div className='qf-user'>
          <div>用户中心 {study.msg}</div>
          <div>{ study.num }</div>
          <div>{ study.num2 }</div>
          <Button type='primary' onClick={()=>handle(-1)}>自减</Button>
          <Button type='primary' onClick={()=>handle(1)}>自增</Button>
        </div>
      )
    }
  )
)
