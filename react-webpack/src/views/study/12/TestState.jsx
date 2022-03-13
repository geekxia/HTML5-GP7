// state 是React组件自身的数据，具有“响应式”的特性（当state变量被this.setState()修改时，视图会自动更新）。
  // 这里的“响应式”和vue响应式是完全不同的，React中没有“数据支持、依赖收集”等工作。

// 1、定义state
  // 在类组件中才有state（函数式组件中没有state），必须在constructor这个生命周期中定义state。
  // state，必须“先定义、再使用”。state变量一般是基本数据类型、数组、普通对象。不能定义其它的数据类型。

// 2、使用state
  // 在类组件中，使用this.state来访问所有的state变量。

// 3、state的特点
  // 当使用this.setState()这个专属方法来修改state时，这会触发render()运行并返回新的“Fiber”，进一步执行“协调运行”（找到最小化的脏节点集合），最后一次“提交”更新DOM。
  // state是当前组件的“自有数据”，可以通过props传递给后代组件，但不能传递给父组件。这就是React中“单向数据流”（自上而下）。

// 4、如何优雅地修改state变量？
  // 修改state变量必须使用this.setState()这个专属方法。不要直接修改state，因为直接修改state不会触发render()。
  // 每次修改state时都要考虑“新值与旧值是否有”，如果有关使用this.setState(fn,callback)这种语法，如果无关使用this.setState({},callback)这种语法。
  // 示例：this.setState({name:'GP8'})  this.setState(state=>({count:state.count+1}))

// 5、this.setState()异步性
  // 在合成事件（on*开头的系列事件、生命周期钩子）中，this.setState()是异步的。
  // 在微任务函数体中（Promise.then）中，this.setState()是同步的。
  // 在非合成事件中（定时器、DOM事件）中，this.setState()是同步的。

  // this.setState() 为什么默认是异步？因为开发者在同一个“合成事件”中有可能多次调用this.setState()，如果它同步的，这会导致多次render()，这显然是一种性能损耗。所以，React在设计this.setState()把它变成异步的，这样的好处是更好保证this.setState()的浅合并，以节省性能。

  // 什么是合成事件？on*事件处理器、生命周期钩子都是合成事件。合成事件是React官方专门封装一组API，这些合成事件是“可控的”，React就可以放心地把合成事件中的this.setState()变成异步的，目的是为了对多个this.setState()进行浅合并，以节省性能。

  // this.setState()在合成事件中是异步的。那我们如何知道这个异步任务完成了？
    // 方案一：this.setState(fn|{}, callback) 在callback被调用时就说明这个异步工作完成了。
    // 方案二：componentDidUpdate() 当这个生命周期被触发时，说明这个异步工作完成了。
    // 建议：React官方建议，方案二更靠谱，方案一尽量少用。

  // 测试this.setState()的同步性：在非合成事件中，它都是同步的。如果一定要给个解释，React无法操控“非合成事件”，所以没有办法把this.setState()变成异步的，所以也不存在性能优化。
    // 场景一：在定时器中，this.setState()是同步的。
    // 场景二：用dom、ref的方式绑定事件，在事件处理器中，this.setState()也是同步的。
    // 场景三：在new Promise().then()中，this.setState()是同步的。（异议：后面再用真实ajax测试）

// 6、this.setState() 浅合并
  // 理解：在同一个更新周期（合成事件）中，如果多次调用this.setState()，React会自动将它们合并，以节省性能。

import React from 'react'

export default class TestState extends React.Component {
  constructor (props) {
    super(props)
    // 定义state
    this.state = {
      count: 1,
      name: 'GP7',
      info: {
        a: 1,
        b: 2,
        c: 3
      },
      num: 100
    }
  }
  changeCount () {

    // [不建议，因为代码逻辑中有直接修改state]
    // this.setState(state=>({count:++state.count}))
    // this.setState(state=>({count:state.count++}))

    // this.setState(function(state){return{count:state.count+1}})
    // this.setState(state=>{return{count:state.count+1}})
    this.setState(state=>({count:state.count+1}))
  }
  changeName () {
    this.setState({name: 'GP8'})
  }
  changeInfo () {
    this.setState(({info})=>({info:{...info, a:info.a+1}}))
  }
  numChange () {
    console.log('1---',this.state.num)
    this.setState({num:200}, ()=>{
      console.log('5---', this.state.num)
    })
    // do something
    console.log('2---',this.state.num)
    this.setState({count:500}, ()=>{
      console.log('6---', this.state.num)
    })
    // do something
    console.log('3---',this.state.num)
    this.setState({num:300}, ()=>{
      console.log('7---', this.state.num)
    })
    console.log('4---',this.state.num)
    // do something
    setTimeout(()=>{
      console.log('9---', this.state.num)
      this.setState({num:400}, ()=>{
        console.log('11---', this.state.num)
      })
      console.log('10---', this.state.num)
    },0)
  }
  componentDidUpdate () {
    console.log('8---', this.state.num)
  }

  componentDidMount () {
    // 用dom或ref的方式绑事件
    document.getElementById('btn').addEventListener('click', ()=>{
      // 以下都是同步代码
      console.log('d---', this.state.num)
      this.setState({num:1000}, ()=>console.log('a---', this.state.num))
      this.setState({num:2000}, ()=>console.log('b---', this.state.num))
      this.setState({num:3000}, ()=>console.log('c---', this.state.num))
      console.log('e---', this.state.num)
    })

    // 测试微任务中this.setState()的同步性【真实接口】
    new Promise(resolve=>{
      setTimeout(()=>{
        console.log('被封装成Promise的异步任务')
        resolve()
      }, 2000)
    }).then(()=>{
      console.log('A---', this.state.num)
      this.setState({num: 100000}, ()=>console.log('B---', this.state.num))
      this.setState({num: 200000}, ()=>console.log('C---', this.state.num))
      console.log('D---', this.state.num)
    })

    new Promise(resolve=>{
      resolve()
    }).then(()=>{
      this.setState({num:300000}, ()=>console.log('E---', this.state.num))
    })
  }
  render () {
    // 在这里把state变量解构出来，再用于jsx渲染
    const { count, name, info, num } = this.state
    console.log('re-rendered')
    return (
      <div>
        <h2>学习state</h2>
        <div>{ count }</div>
        <div>{ count*100 }</div>
        <div onClick={this.changeCount.bind(this)}>自增</div>
        <hr/>
        <div>{ name }</div>
        <div onClick={this.changeName.bind(this)}>改名</div>
        <hr/>
        <div>{ info.a }</div>
        <div>{ info.b }</div>
        <div>{ info.c }</div>
        <div onClick={this.changeInfo.bind(this)}>信息变化</div>
        <hr/>

        <div>{ num }</div>
        <div onClick={this.numChange.bind(this)}>点击</div>
        <hr/>
        <div id='btn'>点击(DOM事件)</div>



      </div>
    )
  }
}
