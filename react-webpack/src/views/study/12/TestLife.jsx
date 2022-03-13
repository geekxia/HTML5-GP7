// 生命周期：描述的是组件从生到死的过程。

// 【3-2-1】
// 挂载阶段【3】constructor / render / componentDidMount
// 更新阶段【2】render / componentDidUpdate
// 卸载阶段【1】componentWillUnmount

// 【一个特殊的生命周期】shouldComponentUpdate

import React, { Component, PureComponent } from 'react'
export default class extends Component  {

  // constructor()
  // 构造器函数，它的入参是props（由父组件传递过来的自定义属性和children）
  // 第一行代码必须是 super(props)，调用父类的构造器函数
  // 组件自有的state只能在这里定义（先定义后使用），state就是所谓的声明式变量
  // 在这里不能修改props，在这里也不能用props来做运算。
  // 在这里不要把props和state交叉赋值（运行），在React代码逻辑，永远要保持props和state的独立性。
  // 在这里不要使用this.setState()修改state。
  // 一般情况下，不要在这里写业务逻辑，比如DOM、BOM操作等都不要在这里做。
  // 但，有时候我们需要改变this指向时，可以这里做。
  constructor (props) {
    super(props)
    console.log('-----constructor')
    this.state = {
      count: 1,
      num: 100
    }
  }

  // componentDidMount
  // 相当于vue中mounted()，表示挂载阶段已完成。
  // 各种业务逻辑（DOM操作、ref操作、调接口、开定时器）等都可以在这个做。
  // 在这里可以this.setState()，默认还是异步的。
  componentDidMount () {
    console.log('-----componentDidMount')
    this.forceUpdate()
  }

  // shouldComponentUpdate()
  // 这个生命周期相当于一个用于控制更新的“开关”
  // 这个生命周期只会影响更新阶段，不会影响其它阶段。
  // 注意：如果你用到了这个生命周期，无论里面的逻辑多么复杂，都返回返回一个布尔值。
  // 使用场景：举个例子，state中有10个声明式变量，但只有9个变量参与了视图渲染，还有1个变量与视图渲染没有任何关系。当有人使用this.setState()来修改这个与视图渲染无关的变量时，这将也会触发render()返回新的JSX，白白地浪费了性能。所以这个生命周期是React给出的一种性能优化方案。
  // 这个优化方案要考虑props和state两重数据流对视图渲染的影响，这个优化方案异常复杂，所以实践工作中几乎没人用。
  // 【现在】React官方提供了一个 PureComponent 构造类，彻底地解决上述这个难以解决的优化问题。
  // this.forceUpdate()它会绕过这个生命周期。shouldComponentUpdate对this.forceUpdate()不影响。
  // 仅用于应对面试。
  shouldComponentUpdate (props, state) {
    console.log('-----shouldComponentUpdate', state, props)
    // 如果需要做优化的state越多，这里的优化逻辑将越复杂。
    // 如果新count != 旧count，这说明count变了
    // 如果新num != 旧num，这说明num变了
    return state.num !== this.state.num
  }

  // componentDidUpdate()
  // 相当于vue中的updated()，表示更新阶段已完成。
  // 在当前组件中，有三种方式触发更新阶段：props变化、this.setState()、this.forceUpdate()
  // 使用场景：this.setState()这个异步工作完成时，我们去做另一件非render的事件。
  // 在这里可以使用this.setState()，但必须给终止条件。（你可以想一想递归）
  // 这个生命周期，是更新阶段的，发生在render()之后。
  componentDidUpdate () {
    // 官方并没有给出这个52次循环的说法。
    if (this.state.count<52) {
      this.setState(state=>({count:state.count+1}))
    }
  }

  // componentWillUnmount()
  // 相当于vue中beforeDestroy()，表示当前组件即将被销毁。
  // 在这里一般用于清除定时器、长连接、清缓存等。
  // 在这里可以调用this.setState()，但毫无意义。
  componentWillUnmount () {
    this.setState({count:200})
  }

  // render()
  // 这个生命周期，是React所有生命周期中必须要有的。
  // 这个生命周期横跨两个阶段，在挂载阶段和更新阶段都执行。
  // 组件初始化、this.setState时、this.forceUpdate时、props变化时，它会执行。
  // 在更新阶段，如果当前有shouldComponentUpdate并返回false时，render()将不执行。
  // 在挂载阶段，render()一定会执行，shouldComponentUpdate不影响render()。
  // 特别提醒：
    // 1、在“自定义渲染方法”中不能使用this.setState()。
    // 2、在render()内部、return()之间，不能使用到this.setState()。
    // 3、在JSX中不能调用this.setState()方法。
  // render() 方法一定要返回 ReactNode，不能返回void。
  render () {
    console.log('-----render')
    const { num } = this.state
    return (
      <div>
        <h1>学习生命周期</h1>
        <h1>{ num }</h1>
        <div onClick={()=>this.setState(s=>({num:s.num+1}))}>自增</div>
      </div>
    )
  }
}
