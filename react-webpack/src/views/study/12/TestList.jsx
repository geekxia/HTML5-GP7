// 列表渲染：React官方建议使用map()进行渲染。
// 语法基础：JSX支持对数组的渲染。

// 为什么官方建议使用map()方法来实现列表渲染？
// 语法：const newList = list.map(fn)，
// 特点：map()方法的特点，对源数据进行fn处理，返回一个新的jsx数组。

import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        { id: 1, name: '张三', age: 10 },
        { id: 2, name: '李四', age: 20 },
        { id: 3, name: '王五', age: 30 },
        { id: 4, name: '赵六', age: 40 }
      ],
      grid: [[1,2,3],[4,5,6],[7,8,9]],
      navArr: [
        {
          id: 1, nav: '体育',
          children: [
            {
              id: 2, nav: '足球',
              children: [
                { id: 3, nav: '世界杯' },
                { id: 4, nav: '亚洲杯' }
              ]
            }
          ]
        },
        { id: 5, nav: '娱乐' }
      ]
    }
  }

  renderList1 () {
    const { list } = this.state
    return list.map(ele=>(
      <div key={ele.id}>{ele.id} - {ele.name} - {ele.age}</div>
    ))
  }

  renderList2 () {
    const { list } = this.state
    return list.map(ele=>{
      // do something
      ele.age += 200
      return (
        <div key={ele.id}>
          {ele.id} - {ele.name} - {ele.age}
        </div>
      )
    })
  }

  renderGrid () {
    const { grid } = this.state
    return grid.map(ele=>(
      <div key={ele}>
      {
        ele.map(ele=>(
          <span key={ele}>{ele}</span>
        ))
      }
      </div>
    ))
  }

  renderNav () {
    const { navArr } = this.state
    const result = []
    function r (list) {
      list.map(ele=>{
        result.push(<div key={ele.id}>{ele.nav}</div>)
        if (ele.children) r(ele.children)
      })
    }
    r(navArr)
    return result
  }

  render () {
    const { list } = this.state
    return (
      <div>
        <h2>列表渲染</h2>
        { [1,2,3,4] }

        {
          list.map(ele=>(
            <div key={ele.id}>{ele.id} - {ele.name} - {ele.age}</div>
          ))
        }
        <hr/>
        { this.renderList1() }
        <hr/>
        { this.renderList2() }
        <hr/>

        <div className='grid'>{ this.renderGrid() }</div>
        <hr/>

        { this.renderNav() }
      </div>
    )
  }
}
