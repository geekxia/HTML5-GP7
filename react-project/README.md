# 学习目标

- 学习@reduxjs/toolkit的数据架构（相对传统的redux架构更加简单）
- 熟悉TS环境（静态检测环境）。
- 权限设计（react-project 由后端实现权限）
- 学习完整的Hooks编程（增删改查）
- antd使用（表单、表格）、自定义封装组件。
- 自定义封装国际化组件
- 定制主题（使用less，或者直接修改antd样式文件）
- 使用图表（echarts、bizchart、ant-design-chart）
- 使用地图（百度地图）
- 结合有赞系统（选择一些有代表性页面）
- ……

# 关于@reduxjs/toolkit

- 它可以优化 redux的传统架构，@reduxjs/toolkit中已经内置了redux、redux-thunk、immer。
- 它可以更好地兼容 typescript 环境，还可以更好实践 Hooks 函数式编程。

# 项目创建

```
1、创建传统的react+redux架构环境
create-react-app react-admin
自行安装redux、redux-thunk、react-redux、immer并设计架构（不支持TS）

2、创建react+redux的TS环境
create-react-app react-admin --template typescript
自行安装redux、redux-thunk、react-redux、immer并设计架构（支持TS和ES6）

3、创建react+redux的TS环境（最佳实践）
create-react-app react-admin --template redux-typescript
无须再安装redux等，默认就已经集成了@reduxjs/toolkit的Redux架构
```

- 参考链接：https://github.com/reduxjs/cra-template-redux-typescript


# 环境搭建

- 暴露出webpack等配置文件
```
npm run eject
```
- 可以基于create-react-app做二次封装（是可选的）
- 在scripts/start.js 修改默认端口号为 8080
- 在src/setupProxy.js，代码如下：
```
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9999',
      changeOrigin: true
    })
  );
}
```
- 在config/webpack.config.js添加 alias别名：@ 代表src根路径。
- 支持less，在config/webpack.config.js添加less-loader的模块处理规则。(参考antd中支持less写法)
```
cnpm i less@3.12.2 -D
cnpm i less-loader@7.3.0 -D
```
- 支持sass，只需要安装 sass
```
cnpm i sass -D
```
- 在@reduxjs/toolkit中集成其它中间件：redux-logger，还要安装 @types/redux-logger来支持TS环境。
- 在当前环境导入.css文件，TS报“缺少CSS声明文件”的错误，建议把样式改变成.scss文件。
- 如果项目中在导入.ts文件时省略后缀报错，在config/webpack.config.js中找到 extensions 修改配置。
- 启动项目中，一些无关的目录中出现路径错误，也会影响项目的运行。建议把那些无关的文件中的路径也整对。
- 启动项目时不打开浏览器，scripts/start.js中注释掉 openBrowser()。
- 如何解决ts环境下'@'报错问题？在tsconfig.json中添加 baseUrl和paths 选项。参考链接：https://www.typescriptlang.org/tsconfig#compilerOptions

- 解决TS问题两个技巧：
  - 巧用 any
  - 把.ts文件临时改成.js文件，把.tsx文件临时改成.jsx文件。
- 入门学习TS
  - TS笔记：https://zhuanlan.zhihu.com/p/377754481
  - TS中文网：https://www.tslang.cn/docs/handbook/basic-types.html


# 业务开发

- 表单验证方式：使用Form.Item 的rules进行验证，自定义表单验证。
  - rules: [ { 验证条件、错误提示、触发机制 } ]

- 图表
  - echarts (DOM写法、2021年正在发布组件化的写法)，建议用DOM写法。
  - bizchart（只有组件化的写法），在React开发建议使用。
  - ant-design-chart（是antv子集中的子集）
- highchart（是一个国外的图表，不是很好用）

- 地图：百度地图、高德地图、谷歌地图。。。
  - 如何接入地图？（申请账号、BMapGL、版本）
  - 定制地图的图层、配色（参见文档）
  - 常用功能：点击事件、添加控制、添加覆盖物、地址解析、路线规则……
  - 官网上有很多“示例demo”“类参考”，多翻一翻。

- 国际化：同一个网站支持多种不同的语言。
  - 组件的国际化（UI组件库会提供支持）
  - 前端界面国际化（react-intl、或者自己定义国际化组件）
  - 数据国际化（后端技术，与前端无关）


- 【react-project】
  - @reduxjs/toolkit数据架构
  - typescript环境熟悉：基础、编译选项、声明文件
  - react-router-dom(v6)用法，权限设计的流程（登录流程、刷新流程）
  - 文章列表（增删改查）QfTable、QfUpload、QfQuill、表单双向绑定、表单验证。
  - 图表开发：echarts(DOM写法)、bizcharts(组件化的写法)，两个官网都翻一翻。
  - 国际化
  - 地图接入。。。。
