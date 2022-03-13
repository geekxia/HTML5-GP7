# 需求列表

- 使用cross-env实现，连接两个不同的数据。
```
npm run start:vue  连接gp7这个数据库
npm run start:react  连接gp77这个数据库
```
- 为了vue项目接口和react项目接口的可维护性
  - 添加react_models目录
  - 添加react_controllers目录
  - 在app.js中添加动态路由的中间件
