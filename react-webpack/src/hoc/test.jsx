import React, { PureComponent } from 'react'

// 这个高阶组件（高阶函数）就是纯函数，接收一个UI组件，返回一个新的React组件。
// WrappedComponent，一般被称之为“UI组件”（界面）
// footer这个高阶组件，一般被称之为“容器组件”（装饰）

// 高阶组件的标准语法：fn(UI组件)(return props=>(<UI组件 {...props} />))
// 备注：{...props} 属性继承，在封装高阶时一定要添加属性继承。

export default function (WrappedComponent) {
  return class extends PureComponent {
    constructor (props) {
      super(props)
    }
    requestList () {
      console.log('触发调接口')
    }
    render () {
      return (
        <>
          <WrappedComponent
            {...this.props}
            a={1}
            b={2}
            c={<span>icon</span>}
            request={this.requestList}
          />
          <footer>我们网站公共的底部</footer>
        </>
      )
    }
  }
}
