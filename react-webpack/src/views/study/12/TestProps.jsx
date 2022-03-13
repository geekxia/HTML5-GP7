// props是React基础中最重要的一个技术点。

// 1、什么是props？
  // 定义：props是父子组件之间通信的纽带，它表示的是父组件传递过来的自定义属性和children。
  // props是一个对象，通过props可以访问到父组件传递过来的自定义属性和children。
  // props是只读的（不能修改它）
  // 通过props，可以向子组件传递ReactNode（ReactElement、基本数据类型、数组、JSX对象）、普通对象、函数等。

// 2、React的两种组件
  // 什么组件？组件就是一个段可以被复用的代码块。组件化的意义：封装、快速开发。
  // 进一步理解组件：组件实际就是一个“函数”，它接收props作为入参，返回用于视图渲染的JSX元素。因为props是只读的，所以每一个React组件都是一个“纯函数”。（什么是纯函数？入参不能改，给相同入参时总是返回唯一的结果。）
  // 提示：虽然props不能修改，但可以参与业务逻辑运算。

  // （一）函数式组件（无状态组件）
  // const Hello = (props) => (<div></div>)
  // 特点：它只有props，没有state状态，也没有this、生命周期、ref、上下文等特性。所以它的性能较好。
  // 提示：自 React v16.8 以后，我们可以通过 Hooks API 来模拟上述缺失的React特性。

  // （二）类组件（有状态组件）
  // class Hello extends React.Component { // this.props }
  // 特点：它有props，也有state状态、this、生命周期、ref、上下文等特性。相对于函数式组件其性能较差。
  // 提示：自 React v16.8 以后，类组件越来越少使用了。现在市场中主流是Hooks+函数式组件。

// 3、父子组件
  // 什么是 props.children ？它代表是自定义组件内部所嵌套的ReactNode列表。
  // 在自定义属性时，不要把属性名命名为 children，因为它有特殊含义。
  // 在props.children向子组件传递children时，建议传递ReactNode列表，不要传递普通数据。如果要传递数据，建议使用自定义props。

// 4、父子组件通信：父传子使用自定义属性，子传父通过自定义事件。（从Vue的角度来理解父子组件）
  // 父组件给的props如果是“普通数据”，用于渲染、用于逻辑操作。
  // 父组件给的props如果是“函数”，在子组件中可调用并向父组件返回数据。
  // 父组件给的props如果“JSX对象”，在子组件中直接参与渲染。

// 5、props是“组件化（组合）”的语法基础。

import React, { Component } from 'react'

function Child (props) {
  console.log('child props', props)
  const { children, name, age, onChange } = props
  return (
    <div>
      <h3>我是孩子</h3>
      { children }
      <div>{name}</div>
      <div>{age}</div>
      <div onClick={()=>onChange('春天')}>春天</div>
      <div onClick={()=>onChange('夏天')}>夏天</div>
      <div onClick={()=>onChange('秋天')}>秋天</div>
      <div onClick={()=>onChange('冬天')}>冬天</div>
    </div>
  )
}

export default class TestProps extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 1
    }
  }
  change(season) {
    console.log('parent changed', season)
  }
  render () {
    return (
      <div>
        <h1>学习组件和Props</h1>
        <Child
          name='qf'
          age={30}
          show
          list={[1,2,3]}
          info={{a:1,b:2}}
          onChange={this.change}
          title={<div>标题</div>}
        >
          <div>一</div>
          <h2>二</h2>
          { null }
          { [<div key='3'>三</div>, <div key='4'>四</div>] }
          { false }
          { (()=>(<div>五</div>))() }
        </Child>
      </div>
    )
  }
}
