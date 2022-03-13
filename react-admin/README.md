# 学习目标

- 学习create-react-app脚手架
- 学习经典redux、react-redux数据流架构
- react全家桶：react-router-dom、ant-design...
- 实践hooks编程（函数式组件）
- 编写菜单管理、用户管理、角色管理等功能开发
- 可预测的数据流、实践组件化。

# 环境搭建
```
cnpm i create-react-app -g
create-react-app react-admin
cd react-admin
git init
git add --all
git commit -m 'first commit'
npm run eject
# 如果卡住了，直接结束掉项目，删除node_modules包
cnpm install
npm start
```
- 把src目录、public目录、入口文件、App根组件中无关的文件和代码整理好。

# create-react-app

- 脚手架文档
- webpack的二次封装（建议模仿vue.config.js）

# redux集成

```
cnpm i redux -S
cnpm i react-redux -S
cnpm i redux-thunk -S
```

- 第一步,构建store的逻辑
```
const store = createStore(
  combineReducers({good,user,...}),
  compose(
    applyMiddleware(ReduxThunk),
    applyMiddleware(ReduxLogger),
    ...
  )
)
```
```
import produce from 'immer'
function reducer(state=initState, action) {
  return produce(state, newState=>{
    switch(action.type) {
      case '':
    }
  })
}
export default reducer
```

- 第二步,连接redux和react
```
function App() {
  return (
    <Provider store={store}>
    </Provider>
  )
}
```
- 第三步,在react组件中使用store
  - 如果是类组件, 只能使用 connect() 高阶组件.
  ```
  @connect(
    state=>({msg:state.user.msg, ....}),
    dispatch=>({changeMsg:(payload)=>dispatch({type,payload})})
  )
  class Home extends PureComponent { }
  export default Home
  ```
  ```
  class Home extends PureComponent { }
  export default connect(
    state=>({msg:state.user.msg, ....}),
    dispatch=>({changeMsg:(payload)=>dispatch({type,payload})})
  )(Home)
  ```
  - 如果是函数式组件, 使用 connect() 高阶组件
  ```
  export default connect(
    state=>({msg:state.user.msg, ....}),
    dispatch=>({changeMsg:(payload)=>dispatch({type,payload})})
  )(props=>(<div></div>))
  ```
  - 如果是函数式组件(react v16.8),还可以使用react-redux的hooks写法
  ```
  export default () => {
    const msg = useSelector(state=>state.user.msg)
    const dispatch = useDispatch()
  }
  ```

- 重新梳理redux中的三个概念
  - store, 如何创建store, store有哪三个特点(单一数据源,只读的,只能使用reducer来修改store)
  - action, 是一个plain object, 它是固定格式的{type:'信号',payload:'负载'},你可以把它理解成是"一封邮件", action是给dispatch(action)用的,这表示的是"一个业务逻辑".

- 从redux架构的角度,思考下面几个问题?
  - 为什么要把redux架构中的所有type抽离成常量,并且放在同一个type文件中? 就是为了低耦合,避免协同开发中对type赋值冲突的问题(如果type冲突,"信号"就冲突了,那么redux工作中肯定出现bug,这也违背了"单向数据流"的设计理念).
  - redux默认不支持异步调接口, redux的store如果接收到了一个非action={type,payload}的信号时,会报错. 那该怎么办呢? 使用redux-thunk来解决问题. redux-thunk这个中间件作用是在store收到信号时对"信号"的数据类型进行判断,如果function类型,redux-thunk就调用这个funciton并把dispatch传递这个function,还会拦截掉这个function, 所以这个function就不会抵达reducer.
  - 为什么要封装"action生成器"? 其一是为了把业务逻辑(调接口的逻辑)从react组件中抽离出来, 其二是action可以被复用.(在这里,你可把"action生成器"理解成一个具体的业务逻辑).

- redux原理? redux和mobx有什么区别?分别有什么优势和劣势?
  - redux是基于事件监听,react上下文,高阶组件来实现的, 比较适用中大型项目.
  - mobx是典型的响应式的状态管理工具, 比较适用于中小型项目.

- 如何手动封装 react-redux ? (上下文,高阶组件,Hooks)

- 如何封装connect()? 首先要理解connect到底在做什么? mapStateToProps把store.getState()中的数据添加到当前UI组件的props上, mapDispatchToProps给当前UI组件的props方法注入store.dipatch这个API, connect()还做了另一件重要的事,在当前UI组件中监听store变化.
- 思路1: 编写类组件,使用 contextType接收ReactReduxContext上下文(也就是说你在当前UI组件中就拿到了store数据), 在componentDidMount()监听store的变化,当store变化时强制更新页面.
- 思路2: 编写函数式组件, 使用useContext()拿到上下文(就是拿到了store数据),在useEffect()监听store变化,当store变化时set*方法触发当前组件更新.

- 如何封装useSelector()? 它所做的事情和connect()是一样的. 使用useState/useReducer都能实现.


# 辅助开发系统

- 功能：布局、路由、菜单管理、角色管理、用户管理、定制主题。。。
- 工具：README，有赞管理系统，Axure原型工具（墨刀）、流程图。。。

# 项目实战第一天总结

- create-react-app默认支持sass，已经安装过sass-loader(v10)，还需要安装sass，重启项目就成功。
- 在create-react-app默认是不支持less，需要自己安装less-loader(v7)和less(v3)，正常create-react-app脚手架不支持less（antd只支持less和css）,实现定制主题要集成less。
- 页面（用户管理）：用户列表、添加用户（选择角色），组件用到了 Table、Select、Input。
- 页面（菜单管理）：菜单列表（可以展开的二级表格, 数据源中有children），新增菜单（path、text、component、icon）, 用了一个新Form（Form.Item具有双向绑定功能,被它直接包裹的表单有了value和onChange），当Form.Item如果放不是表单，我们需要封装“类表单”来解决问题？？？（我能想起ModuleSelect?）
- 页面（角色列表、角色RoleForm页面）角色RoleForm用于编辑或新增角色（两条不同的路由对应同一个组件），这里要用到一个Tree组件（因为比较复杂，老师封装了 RoleTree，放在Form.Item中进行双向绑定）

# Bug与需求

- 管理系统布局：Layout，代码组件，Menu菜单（Link）, Content（Route递归）、样式处理
- 左侧菜单折叠功能：<Logo>、<Toggle>组件封装。
- 顶部Header：我还想做国际化、登出、用户信息。。。
- Content中：滚动条实现，面包屑导航。。
- 菜单管理页面，把“添加菜单”“添加模块”的交互按钮放在表格的表头，Table.title={()=>ReactNode}，还用到 Modal组件。在Modal中用到了Form收集数据，怎么收集数据？使用Form.useForm()得到form实例，通过实例api来获取表单的值。（我感觉Form，进一步深入研究）
- Table报each key的问题。给Table添加rowKey属性（对应列表数据的id）。
- 添加Login页面（和Layout是二选一），这里要用到Route嵌套（注意'/'，注意Switch、注意exact、注意Redirect）。后续设计接口，这个登录过程是一个什么流程？（登录流程、刷新流程）

- 接口联调
  - React重要原则：一切外部数据建议都从props进来。所以我们调接口统一走Redux流程。
  - 再次理解“单向数据流”：React数据只能自上而下地传递（props和上下文），Redux是实现了Flux数据架构思想而呈现出的流程流（Store->View->Action->Store）。
  - 调试工具：react-devtools、redux-logger

- 在已经登录的状态下，用户刷新系统内部页面成功时，左侧Menu菜单的展开、高亮效果和刷新一样。
