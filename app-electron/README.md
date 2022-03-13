# Electron 简介

- 跨平台技术：做桌面应用 Electorn  / NW.js
- Electorn 本质上是 Node.js + 谷歌浏览器的内核，所以它可支持election代码逻辑，还可以渲染Web页面。
- 桌面应用技术栈：Electorn是壳子，在这个壳子里面可以使用任意的web前端技术（jQuery/Vue/React/Angular）
- 虽然Electron中有浏览器的内核，但没有CORS同源策略，所以在electron开发中，可以直接调接口。

# 搭建Electron环境
```
mkdir electron-app
cd electron-app
npm init
cnpm i electron -g
cnpm i electron -S
```
- mian.js 是electron的主线程，一般用于创建窗口。。。
- preload.js 是electron的渲染线程。。。
- 运行桌面应用：`electron .`

# 手动搭建Vue(装饰器)环境
```
cnpm i webpack -D
cnpm i webpack-dev-server -D
cnpm i @babel/coo......
cnpm i vue-loader babel-load.....
cnpm i html-webpack-plugin ....
```
```
cnpm i vue vue-router vuex -S
cnpm i vue-property-decorator vuex-class -S
```
- webpack.config.js 中配置入口、出口、loaders、plugins。。。
- babel.config.js 对babel进行若干配置，还要支持装饰器语法。。。
- vue装饰器编程范式，参考 src 目录。

# 环境运行

- 在election中区分开发和生产环境，使用到了`electron-is-dev`
- 运行项目时希望先启动vue本地服务，再启动桌面应用，使用到了`concurrently`

# Electorn打包

- 首先要对前端项目进行打包（前端项目打包的注意事项和普通web项目打包一致）
- 进一步打包electron项目（打包工具推荐使用 electorn-builder）
  - 打包步骤：https://github.com/electron-userland/electron-builder
  - 打包注意：对package.json文件进行各种配置，尤其"build"配置。
  - build配置参考：https://www.electron.build/configuration/configuration#configuration
