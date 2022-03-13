import React, { PureComponent } from 'react'

// 上下文：这是React官方提供的一种在组件树之间自上而下地传递数据的方案。

// 作用：在组件树之间进行数据传输。
// 特点1：上下文向子组件传递数据可以绕过props，每个组件节点都可以直接访问到上下文。
// 特点2：数据流自根组件向后代组件传递，只能单向的，即“自上而下”。

// 工作中：我们很少自己封装上下文。大多情况下，都在使用第三方库（都是依托于上下文实现的），比如react-router、mobx、redux、自定义封装国际化组件库。

// 在React中如何使用“自定义上下文”？
// 1、使用React.createContext()创建“上下文组件”
// 2、在组件树的任何节点上包裹一个 <Provider value={数据} />
// 3、在后代组件节点上，使用 contextType属性 或者 使用Consumer使用上下文数据。

import ThemeContext, { Consumer } from '@/utils/theme'

// 一、使用Consumer组件来消费上下文中的数据
export default class extends PureComponent {
  render () {
    return (
      <Consumer>
      {
        theme=>(
          <div style={theme}>
            <h1>学习上下文</h1>
          </div>
        )
      }
      </Consumer>
    )
  }
}


// 二、使用上下文的另一种写法（仅供参考）
// class TestContext extends PureComponent {
//   render () {
//     console.log('this', this)
//     const theme = this.context
//     return (
//       <div style={theme}>
//         <h1>学习上下文</h1>
//       </div>
//     )
//   }
// }
// TestContext.contextType = ThemeContext
// export default TestContext
