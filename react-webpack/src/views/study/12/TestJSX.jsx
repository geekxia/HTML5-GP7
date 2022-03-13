import React from 'react'

// 1、React组件 vs. React元素。React组件就是我们所说的React类组件或函数式组件；所谓的React元素指的是React组件实例化的对象。
  // App - React组件（类、函数）
  // <App> - React元素（JSX元素）

// 2、什么是JSX？JSX = JavaScript XML，这是React官方发明的一种JS语法（糖）。
  // 浏览器默认是不支持JSX的，所以jsx语法必须使用@babel/preset-react进行编译，编译的结果React.createElement()这种Api的代码。
  // 示例：<div>Hello</div>  ==>@babel/preset-react==> React.createElement('div',{},'Hello')
  // 在React开发中，JSX语法是可选的（也就是你可以不使用JSX）。如果不使用JSX语法，React组件代码将变得特别麻烦（难以维护）。所以几乎所有React开发都用的是JSX语法。

  // const result = <div>Hello World</div>
  // const result = React.createElement('div', {}, 'Hello World')

  // const result = (
  //   <div className='people' title='people'>
  //     <h1>小王</h1>
  //     <h2>小李</h2>
  //     <div>
  //       <span title='addr'>地址</span>
  //       <span id='tel'>电话</span>
  //     </div>
  //   </div>
  // )

  // const result = React.createElement(
  //   'div',
  //   {
  //     className: 'people',
  //     title: 'people'
  //   },
  //   [
  //     React.createElement('h1',{key:'1'},'小王'),
  //     React.createElement('h2',{key:'2'},'小李'),
  //     React.createElement(
  //       'div',
  //       {key:'20'},
  //       [
  //         React.createElement('span',{title:'addr',key:'4'},'地址'),
  //         React.createElement('span',{title:'tel',key:'5'},'电话'),
  //       ]
  //     )
  //   ]
  // )

// 3、JSX元素是变量，是对象（引用数据类型），它不是HTML字符串。
  // 通常所说的JSX元素有两种，一种html的元素<div/>，另一种是自定义封装<Button/>

// 4、JSX语法中有三个不一样的属性
  // className（相当于html中class属性）
  // htmlFor（相当于html中的for属性）
  // tabIndex（相当于html中的tabindex属性）

// 5、JSX语法中新增了三个属性
  // key 渲染一个列表时，或者渲染一个数组时，都要加key，为了让“diff运算”更加高效。
  // ref 用于快速地访问DOM对象或者访问JSX实例对象。
  // dangerouslySetInnerHTML 向JSX节点中插入一段可以参与渲染的HTML字符串（相当于Vue中的v-html）

// 6、JSX元素可任意嵌套。可以嵌套哪些内容呢？——基本数据类型、数组、JSX元素、函数调用。被嵌套的变量必须用 {} 包起来。这种{}语法是JSX的语法特色。在JSX中凡是被{}所包裹的东西，我们称之为表达式。
  // 如果嵌套的变量是字符串、数值类型，JSX会把它们当作文本进行渲染。（v-text）
  // 如果嵌套的变量是undefined、null、布尔值，JSX会忽略掉它们。
  // 如果嵌套的变量是数组，JSX会把它们当作列表进行渲染（要加key）。（v-for）
  // 如果嵌套的表达式是函数调用，这个函数的返回值必须是JSX支持的变量类型。
  // 如果嵌套的变量是对象，在动态style等特殊语法环境下，是支持的。

  // ReactElement，也叫做“JSX元素”，例如<div/> <Modal/> 凡是被<>包起来的变量都叫做ReactElement。
  // ReactNode，也俗称“React节点”，它包括ReactElement、undefined、null、布尔值、string、number、函数调用等。

  // 注意1：JSX的{}中只能放置变量和表达式。{}中可以发生任何“运算”，但“运算”的结果必须返回的是ReactNode。不能返回void、Symbol、BigInt、Map、Set等其它数据类型。
  // 注意2：建议不要在JSX的{}写JS语句。

// 7、在JSX中添加注释，示例：{/* something */}

// 8、当JSX元素的属性是动态变量时，也要用 {} 包起来。（v-bind）
  // 示例1：<div title={}></div>
  // 示例2：<Model footer={} />

  // 动态属性：你可以理解一个属性的值与声明式变量（state）有关系的。
  // 静态属性：你可以理解一个属性的值与声明式变量无关。

// 9、JSX的{}可以放置变量和表达式，它默认具有防注入攻击（XSS）。

// 10、JSX是不可变对象。怎么理解“不可变对象”？JSX元素（变量）一旦定义了，就不能再修改。
  // 结论：render()的返回值也是不可变对象。
  // 简述声明式变量变化后的更新过程：当this.setState()修改声明式变量时，声明式变量发生变化后，我们更新视图的思路不是直接去修改JSX对象，而是让render()返回一个全新的JSX对象。此时，内存中就有了两个JSX对象（Fiber），React进而对它俩进行“协调”运算（协调运算的过程是可中断的），找出新旧JSX对象中的最小差异（脏节点），然后一次性“提交”更新DOM（不可中断的）。

// 11、React组件名的首字母必须大写。
  // 正确示例：const Model = ()=>(<div />)  // <Modal/>
  // 正确示例：const model = ()=>(<div />)  // { model() }

  // 结论：自己封装React组件，或者使用第三方UI组件库，所有单词的首字母都是大写。

// 12、在JSX类型中使用点语法来实例化一个组件（注意模块命名都要首字母大家）
  // 示例：<Qf.Model />   <Qf.Select />

const Qf = {
  Model: ()=>(<div>弹框</div>),
  Select: ()=>(<div>下拉框</div>)
}

const PhotoList = () => (<div>照片列表</div>)
const VideoList = () => (<div>视频列表</div>)
const unknow = { photo: PhotoList, video: VideoList }

// 页面组件（由路由来控制）
export default class TestJSX extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tt: 'qfedu',
      count: 1
    }
  }
  componentDidMount() {
    this.timer = setInterval(()=>{
      // this.setState()是专门用于修改声明式变量的。
      // 这个API有一个非常重要的特点：它会触发render()重新执行。
      this.setState(state=>{
        return { count: state.count + 1 }
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render () {
    const { tt, count } = this.state
    console.log('-----re-rendered')
    // do something
    const a1 = 'hello world'
    const a2 = 200
    const a3 = undefined
    const a4 = null
    const a5 = false
    const a6 = ['hello', 300, null, true, <div key='hh'>我是元素</div>, a1]
    const a7 = <a href="https://baiduc.com">百度</a>
    // const a8 = [
    //   <div>{[<span>1</span>,<span>2</span>,<span>3</span>]}</div>,
    //   <div>{[<span>4</span>,<span>5</span>,<span>6</span>]}</div>,
    //   <div>{[<span>7</span>,<span>8</span>,<span>9</span>]}</div>
    // ]
    function createGrid () {
      let outer = []
      for (let i=1; i<4; i++) {
        let inner = []
        for (let j=1; j<4; j++) {
          inner.push(<span key={j+(i-1)*3+7}>{ j+(i-1)*3 }</span>)
        }
        outer.push(<div key={i*100}>{ inner }</div>)
      }
      return outer
    }
    function test(a) {
      return function(b){
        return <div>{a*b}</div>
      }
    }
    const a9 = {color:'red',fontSize:'0.5rem'}
    const a10 = 'qf'

    return (
      <div>
        <div>{ a1 }</div>
        <div>{ a2 }</div>
        <div>{ a3 }</div>
        <div>{ a4 }</div>
        <div>{ a5 }</div>
        <div>{ a6 }</div>
        <div>{ a7 }</div>
        { /* <div className='grid'>{ a8 }</div>  */ }
        <div className='grid'>{ createGrid() }</div>
        <div>{ test(2)(4) }</div>
        <div style={ a9 }>测试动态样式</div>
        <div title={ a10 }>千锋教育</div>
        <div title={ 'qf' }></div>
        <div title={ tt }></div>
        <div>{ count }</div>
        <Qf.Model />
        <Qf.Select />
        <div {...{title:'qf', className:'box', id:'box'}}>测试展开运算符</div>
        <div title='qf' className='box' id='box'>与上一行等价的</div>
        <Qf.Model>
          <div>一</div>
          <div>二</div>
        </Qf.Model>
        <div>{`Hello, ${Math.random()}`}</div>
        <div>Hello, {Math.random()}</div>
      </div>
    )
  }
}
