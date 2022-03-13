// 高阶组件（高阶函数）
// 本质：高阶组件本质上就是一个函数。对只有一层的高阶组件，它是纯函数，并且入参是UI组件，返回一个新的React组件。

// 意义：高阶组件是React中逻辑复用的一种高级技巧。

// 如何使用高阶组件？
// 1、在类组件上有两种方式使用高阶组件——函数调用、ES6装饰器。
// 2、在函数式组件上只有一种方式使用高阶组件——函数调用。

// 举例一：用高阶组件实现页面布局的差异化。
// 举例二：用高阶实现权限设计（适用小项目）。
// 举例三：把一些全局的api（公共方法）通过高阶组件传递给UI组件

import React, { PureComponent } from 'react'
import { test, role, page, connect } from '@/hoc'

// 【第一种语法】
// class TestHoc1 extends PureComponent {
//   render () {
//     return <h2>测试高阶组件</h2>
//   }
// }
// export default role(test(TestHoc1))

// 【第二种语法】
// @test
// @role
// @page()
// @connect(function(){
//   return {
//     user: '来自状态管理中的user'
//   }
// }, function(){
//   return {
//     logout: function() {console.log('退出')}
//   }
// })
// class TestHoc2 extends PureComponent {
//   render () {
//     console.log('props', this.props)
//     return <h2>测试高阶组件</h2>
//   }
// }
// export default TestHoc2

// 【第三种语法】
// const TestHoc3 = props => {
//   console.log('props', props)
//   return (
//     <h2>测试高阶组件</h2>
//   )
// }
// export default role(test(TestHoc3))

// 【第四种语法】
// export default connect(
//   () => ({
//     user: '来自状态管理中的user'
//   }),
//   () => ({
//     logout: () => console.log('退出')
//   })
// )(
//   page({
//     navbar: { title: '详情页' }
//   })(
//     props => {
//       console.log('props', props)
//       return (
//         <h2>页面</h2>
//       )
//     }
//   )
// )

export default role(['admin','editor'])(
  props => {
    console.log('props', props)
    return (
      <>
        <h2>页面</h2>
        { props.role==='admin' && <button>辞退</button> }
      </>
    )
  }
)
