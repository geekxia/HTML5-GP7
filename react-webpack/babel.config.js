// 语法：CommonJS

module.exports = {
  // 配置预设
  // 什么预设？就是一些比较大的javascript语法版本。预设不一定能够编译所有的小语法。
  // @babel/core 是Babel编译器的核心代码，最新版本 v7
  // @babel/preset-env 是一个Babel预设，用于编译ES6+语法
  // @babel/preset-react 是一个Babel预设，用于编译jsx语法
  // @babel/preset-typescript 是一个Babel预设，用于编译ts语法
  presets: [
    ['@babel/preset-env', {}],
    ['@babel/preset-react', {}]
  ],
  // 配置插件
  // 什么插件？用于弥补预设不能编译的小语法问题
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    ["@babel/plugin-syntax-dynamic-import", {}],
    ["import", { libraryName: "antd-mobile", style: "css" }],
    ["@babel/plugin-transform-regenerator", {}],
    ["@babel/plugin-transform-runtime", {}]
  ]
}
