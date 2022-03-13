# 学习目标

- Webpack自己搭建脚手架环境：webpack（定制化）react基础、mobx、react-router-dom、antd-mobile、路由权限（移动React H5）

- node v12/v14 （window7不支持node v14）
- 包管理工具：npm、cnpm、yarn

# Webpack

- 类似：webpack、gulp、roodup、vite。。。
- 介绍：webpack是目前最流行的前端构建工具，作用是把各种模块文件及其依赖进行编译打包，转换成浏览器能够普遍兼容的优质代码（静态资源）。
- 理解：你可以把它理解成是一个“超级榨汁机”。
- 理解：在webpack眼中，一切文件皆模块。理论上讲webpack可对任意的文件（模块）进行编译打包。

- 怎么学习webpack？入口、出口、loaders、plugins；devServer。
- webpack是运行node环境中，它是基于配置文件的（定制化特点强），代码语法是CommonJS。

- webpack-cli  建议全局安装、本地也安装。暴露出了很多好用的webpack相关命令行。
- webpack  建议全局安装、本地也安装。它是webpack核心代码，是webpack API和核心插件所在的包。

- 关于webpack的版本说明：v5版本还比较新，更新比较频繁。工作中大多数的项目架构用的是v4。比如目前经典的 @vue/cli、create-react-app都是基于v4构建的。后面讲解的过程中，会给大家普及一些v4和v5的差异。v5呈现的感觉越来越强、也越来越简单。

- 需求：简单配置入口和出口，实现build打包功能。

- 需求：配置本地服务，以便开发环境。
- webpack-dev-server 它是基于express、sockjs的一个node服务器。全局、本地都安装。
- html-webpack-plugin 这是一个webpack plugins，用于把webpack编译后的js代码和指定的html文件组装起来。

- 需求：自动清除dist目录，添加文件hash值，开启编译进度条、开启代码压缩。

- 需求：区分开发环境和生产环境。
- cross-env 手动添加环境变量，这在v4中应用很广泛。
- 使用 `webpack (serve) --env`，这种方式在v5才能使用。
- webpack-merge 对webpack配置文件进行浅合并。

- 需求：把src中的js代码编译成浏览器能够普通兼容的ES5代码。
- babel-loader 是一条loaders规则。
- 安装了一系列的Babel预设和插件，添加babel.config.js对各种Babel包进行配置。
- @babel/core  Babel编译器核心包
- @babel/preset-env  用于编译ES6+代码
- @babel/preset-react  用于编译jsx代码
- @babel/preset-typesript  用于编译ts代码

- 学习方法（作业）：把webpack文档、Babel文档都翻一遍。

- 需求：在当前环境支持图片的模块化。file-loader、url-loader，v5写法参考文档。

- 需求：在当前环境中支持样式的模块化。css-loader、style-loader、css抽离。。。

- 需求：在当前环境中集成ESLint检测（集成React开发环境的代码检测）。
- v4   eslint-loader
- v4   eslint-webpack-plugin  参见.eslintrc.js这个配置。

- 需求：在当前环境下支持jsx语法。
- 安装 @babel/preset-react  参见babel.config.js这个配置。


# webpack扩展

- 常用loader有哪些？罗列七八个。
- 自定义loader
  - 每个loader都是一个function函数，它接收一种文件(对象或字符串)，最终返回另外一种文件(对象、字符串或JS代码)，什么是必须返回JS代码呢？如果当前封装的loader用于webpack规则中最后的一个loader,那么必须返回js代码。
  - 自定义loader的基本语法：
  ```
  module.exports = function(source) {
    // 使用任何第三方js模块do something
    const result = 'some string or object'
    // return `module.exports = ${JSON.stringify(result)}`
    return `export default ${JSON.stringify(result)}`
  }
  ```
  - 如果一个loader不用于webpack规则的最后一个loader，不要抛出js代码。
- 常用loaders有哪些？具体到某一个loader的背后是怎么工作的？如何自定义loader？

- 常用plugins有哪些？罗列七八个。
- 自定义plugin
  - 每个plugin本质上都是一个class类（这个类必须有一个叫apply实例方法，在这个apply用于向webpack的hooks钩子上添加一个事件）。
  - 自定义封装plugin最重要的是理解什么webpack的hooks钩子。
  - 举例：clean-webpack-plugin

- Wepack开发环境优化（start）优化标准：运行速度尽量快
  - devtool: 'inline-source-map'（负）
  - watch代码依赖图的变化，在v5中hot:true实现热更新（正）
  - 在开发环境中开启memory缓存（生产环境下默认是关闭的）（正）
  - 在编写各种loaders规则或者plugin时，使用exclude、include减少node文件系统的工作。（正）
  - 巧用resolve对各种路径进行优化，缩小搜索范围。（正）
  - 使用thread-loader / happypack（注意硬件配置）开启多线程构建。（正）
  - 使用cache-loader对“指定文件模块”进行缓存。（正）
  - 使用 speed-measure-webpack-plugin 对所有的plugins进行加速。（正）

- Webpack生产打包优化（build）优化标准：代码质量优化
  - devtool: 'source-map'（正）
  - chunks拆分
    - 在前端代码中使用“动态导入()=>import()”自动实现代码分离（正）（推荐）
      - 安装 @babel/plugin-syntax-dynamic-import 支持动态导入语法
    - 使用optimization.splitChunks 或 split-chunks-plugin手动实现分离分离（正）（很少用）
  - vendor抽离
    - 在entry入口中对多个chunk中重复的代码进行抽离（正）
  - bundle分析技术
    - 使用webpack-bundle-analyzer对“代码依赖图”进行人工分析
  - 使用 tree-shaking 技术把src中的“死代码”移除掉，以节省打包后代码的体积。
    - 具体做法是在package.json中添加"sideEffects":false，该功能只对mode:production起作用。
  - 抽离CSS并压缩
    - 使用 mini-css-extract-plugin 把css代码抽离出来
    - 使用 css-minimizer-webpack-plugin 把css代码进行压缩
  - terser压缩
    - 使用 terser-webpack-plugin 集成terser高性能压缩

# Webpack学习总结

- 能够使用webpack搭建任意的前端架构环境（v4、v5都要会使用）。
- 尽可能多地了解webpack工作流程、底层原理，以及与vite、gulp、rollup等工具的差异与优劣。
- 尽可能多地实践一些webpack构建优化技巧（运行速度、代码质量）。


# react-router-dom

- v6文档：https://reactrouter.com
- v5文档：https://v5.reactrouter.com/web/guides/quick-start

- react-router
- react-router-dom
- react-router-native

- 安装 cnpm install react-router-dom@5.3.0 -S

- v4 没有路由Hooks
- v5 新增了路由Hooks
- v6 变化很大

- React路由的编程特点：组件化、hooks api、withRouter。

- 安装react-router-dom(v5.3.0)，会使用HashRouter、Route、Switch、Redirect、Link。
- 使用@loadable/component（React.lazy、Suspense）实现“代码分割”。
- 安装antd-mobile，把tabbar组件搞进来。
- 在react-router-dom路由系统中，不是每个React组件都能访问到路由api。只有那些被Route直接包裹过的React页面组件可以通过props访问到路由api。
- 那些未被Route直接包裹的React组件默认无法访问路由api，怎么办呢？
  - 可以通过属性继承{...props}语法，把页面组件的props（路由API）手动向后代组件传递。
  - 使用withRouter这个高阶组件，向组件中注入路由API。（非Hooks编程中用得比较多）
  - 使用react-router-dom（v5）提供的hooks api直接使用路由API。
  - 【】修改react-router-dom出口，把路由上下文对象抛出来，useContext()直接使用这些路由API。

- 路由传参：params动态路由传参，query传参。

- 嵌套视图：Route所包裹的组件中又使用了Route。
  - 在嵌套视图时，一定要用Switch把二级Route路由包裹起来。
  - 在编写Route规则，不要“一刀切地加exact”，注意exact对 / 的影响。
  ```
  function App() {
    return (
      <Switch>
        <Route path='/list' component={List} />
      </Switch>
    )
  }
  function List() {
    return (
      <Switch>
        <Route path='/list/video' component={ListVideo} />
      </Switch>
    )
  }
  ```
  - 在v6中如何解决“嵌套视图”的问题（v6中用element渲染组件）
  ```
  <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/find' element={<Find />}>
      <Route path='video' element={<Video />}></Route>
      <Route path='image' element={<Image />}></Route>      
    </Route>
  </Routes>

  function Find() {
    return (
      <div>something</div>
      <Outlet />
    )
  }
  ```

# 状态管理

- 常用React数据架构：
  - mobx（v5/v6）、mobx-react（v6/v7）
  - mobx(v6)、mobx-react-lite(v3)  更适合Hooks编程
  - redux、react-redux、redux-thunk
  - redux、react-redux、redux-saga（dva）
  - redux、react-redux、@reduxjs/toolkit
  - flux（Facebook官方提出的数据流思想）

- mobx(v5) + mobx-react(v6) 编写语法还有ES5、ES6两种。
- mobx(v6) + mobx-react(v7) 编写语法还有ES5、ES6两种。

- 以下mobx(v6) + mobx-react(v7) 用ES6语法、函数式组件为例，说明集成mobx架构的一般步骤：
  - 1、安装mobx(v6)，用面向对象语法编写store和子store的代码逻辑，参见store目录。
  - 2、安装mobx-react(v7)，在App根组件中，使用<Provider {...store} />
  - 3、在React组件中，使用 inject('user')(observer(props=>(<div></div>)))

# 学习总结

- 工具：node、npm、淘宝镜像、yarn。。。
- webpack(v4/v5) 一个简易版本的webpack配置应该由哪些组件（入口、出口、loaders、babel、eslint、plugin、devServer、生产与开发环境的分离、npm scripts命令的配置）
- webpack优化：运行速度优化、打包构建优化。
- webpack扩展：loaders封装、plugins封装，进一步理解webpack的工作流程。
- 达到目标：能够使用v4/v5搭建任意的前端脚

- react基础：JSX、props、state特点、受控表单、合成事件、状态提升、组合（children、render props）、上下文、高阶组件、Hooks（useState、useEffect、useMemo、自定义Hooks、react-use）、prop-types。
- antd-mobile(v2)这个移动组件库灵活
- 移动端布局、移动端事件由FastClick进行处理（区分PC事件在移动端的bug）。
- sass样式，怎么优雅地组织sass代码。

- react-router-dom(v5)：几个组件（HashRouter、Route、Switch、Redirect、Link），四个Hooks、withRouter。路由传参（params、query）、代码分割（webpack动态导入技术）、嵌套路由（难点）。
- react-router-dom(v6)：有哪些变化。

- mobx(v6) 编写store的技巧，常用注解observable、computed、action、flow、autorun(用于依赖收集).
- mobx-react(v7) 基于上下文和高阶组件的，Provider、observer、inject()。
- 扩展：mobx文档多翻、核心概念（State、Derivation、Action、Reaction）与Mobx的工作流程、Mobx的响应式原理（和Vue的响应原理是差不多）

- 2 * 2 * 2 * 5 * 2 * 2 * 0.6 => 技术选型（前端主管）
