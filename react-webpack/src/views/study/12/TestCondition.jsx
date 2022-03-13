// 条件渲染：元素的显示与隐藏，这里巧用的都是JSX语法。

// 1、单一元素的条件渲染
  // 语法：{ bol && <jsx> }

// 2、两个元素的条件渲染
  // 语法： { bol ? <jsx1> : <jsx2> }

// 3、多个元素的条件渲染
  // 语法：建议封装“自定义的渲染函数”  function renderThing() { return <jsx> }

// 4、动态class
  // 语法：className={'类名的拼接'}

// 5、动态style
  // 语法：style={ css样式的键值值 }

import React from 'react'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bol1: true,
      bol2: true,
      level: 1,
      c: 'c2',
      f: 30,
      p: 0
    }
  }

  // 用于视图渲染的函数，我们一般称之“自定义渲染函数”
  renderLevel () {
    const { level } = this.state
    // do something
    let result = null
    switch (level) {
      case 1:
        result = <div>一阶段</div>
        break
      case 2:
        result = <div>二阶段</div>
        break
      case 3:
        result = <div>三阶段</div>
        break
      default:
    }
    return result
  }

  render () {
    const { bol1, bol2, c, f, p } = this.state
    return (
      <div>
        <h2>学习条件渲染和动态样式</h2>
        { bol1 && <div>我可有可无</div> }
        <div onClick={()=>this.setState(_=>({bol1:!_.bol1}))}>Toggle</div>
        <hr/>

        {
          bol2
          ? <div>我是白天</div>
          : <div>我是黑夜</div>
        }
        <div onClick={()=>this.setState(_=>({bol2:!_.bol2}))}>Toggle</div>

        { this.renderLevel() }
        <div onClick={()=>this.setState(_=>({level:(_.level)%3 + 1}))}>Toggle</div>
        <hr/>

        <div className={`c1 ${c}`}>测试动态样式</div>
        <div onClick={()=>this.setState(_=>({c:_.c==="c2"?"c3":"c2"}))}>Toggle</div>
        <hr/>

        <div
          style={
            {
              fontSize: f + 'px',
              ['padding-top']: p + 'px'
            }
          }
        >测试动态style</div>
        <div onClick={()=>this.setState(_=>({f:_.f+2,p:_.p+2}))}>Toggle</div>
      </div>
    )
  }
}
