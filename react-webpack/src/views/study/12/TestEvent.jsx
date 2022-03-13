// 事件绑定原则：尽可能地使用合成事件来绑定事件。
// 合成事件：https://zh-hans.reactjs.org/docs/events.html

// 1、如何绑定事件？
  // 语法一：使用ES5的方式来绑定事件 onClick={this.handle.bind(this)}
  // 语法二：使用ES6的方式来绑定事件 onClick={()=>this.handle()}
  // 建议：使用“语法二”来绑定事件。

// 2、如何拿到事件对象？
  // ES5方式绑定事件，事件处理器的最后一个参数永远都事件对象。
  // ES6方式绑定事件，需要手动传递事件对象。

// 3、事件处理器如何自定义传递参数？
  // ES5方式事件传参，onClick={this.handle.bind(this, 'arg', ...)}
  // ES6方式事件传参，onClick={ev=>this.handle('arg', ev)}

// 4、如何阻止冒泡、默认事件？
  // 用事件对象的api来实现（二阶段的知识）
  // ev.stopPropagation()
  // ev.preventDefault()

// 5、如何监听键盘事件？
  // 用事件对象的api来实现（二阶段的知识）
  // ev.keyCode

import React from 'react'

export default class TestEvent extends React.Component {
  constructor (props) {
    super(props)
    // this.handle1 = this.handle1.bind(this)
  }
  handle1 (arg1, arg2, ev) {
    console.log('clicked', this)
    console.log('自定义事件参数', arg1, arg2)
    console.log('ev', ev)
  }
  handle2 (arg1, ev, arg2) {
    console.log('clicked', this)
    console.log('自定义事件参数', arg1, arg2)
    console.log('ev', ev)
  }
  search (ev) {
    if (ev.keyCode === 13) {
      console.log('开始搜索', ev.target.value)
    }
  }
  render () {
    // this.
    return (
      <div>
        <h2>学习事件绑定</h2>
        <div onClick={this.handle1.bind(this, [1,2,3], true)}>点击一</div>
        <div onClick={(ev)=>this.handle2({a:1}, ev, [4,5])}>点击二</div>
        <hr/>
        <input
          type="text"
          style={{lineHeight:'1rem',display:'block',width:'100%'}}
          onKeyUp={ev=>this.search(ev)}
        />

      </div>
    )
  }
}
