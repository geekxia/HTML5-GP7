// 语法是CommonJS语法

// 意义：协同开发保证代码规范和一致性。（每个公司的ESlint规范不一样）

// 在v4中，使用eslint-loader来配置ESLint
// 在v5中，使用eslint-webpack-plugin来配置ESLint

// ESLint只是一个javascript代码检测工具，所以根据不同的项目我们需要安装不同的ESLint检测器（代码规范的标准）
// ESLint的配置文件有六种，当前这种是优先级最高的。

// 如何解决ESLint报错或警告的问题呢？
// 1、老老实实地找到报错或警告的地方，把它修复好。（开发环境不便于写代码）
// 2、找到这条ESLint规则的名称，在ESLint配置文件中修改它的检测级别.
// 3、使用ESlint注释包裹代码，忽略这段代码的检测。
  // eslint-disable-line
  /* eslint-disable */ /* eslint-enable */
  /* eslint-disable no-var */ /* eslint-enable no-var */
// 4、找到webpack配置文件，把eslint规则注释掉。（慎用）
// 5、在项目的根目录添加 .eslintigore 这个文件。（选择性地忽略某些目录或文件）

// 经验：如果项目老是频繁报eslint错误，建议直接在项目根目录添加一个.eslintigore文件，选择性忽略某些代码的检测。当提交代码前，一定要移除.eslintigore文件，重启项目，修复所有的eslint问题。（协同开发时，切忌把有eslint问题的代码提交到远程）

// 定制React开发环境的代码检测：

// - eslint-loader 在webpack v4中集成ESLint
// - eslint-webpack-plugin 在webpack v5中集成ESlint
// - eslint 这是ESLint官方提供的基础检测工具，只要使用ESLint必须安装它
// - eslint-plugin-react 这是一个用于检测React语法的ESlint插件
// - eslint-plugin-react-hooks 这是一个用于检测React Hooks语法的ESLint插件
// - eslint-plugin-jsx-a11y 这是一个用于检测React JSX元素属性语法的ESLint插件
// - eslint-plugin-import 这是一个用于检测ES6+模块化语法的ESLint插件
// - eslint-config-airbnb 由爱彼迎公司开源的一个ESLint套件
// - @babel/eslint-parser 它是Babel-ESlint的前身，可兼容ESLint的默认解析器，用于对比较新的js语法进行检测。

module.exports = {
  // babel-eslint 这是一个Eslint的解析器，可以和ESlint、Babel兼容。
  // 现在这个parser不维护了，变成了@babel/eslint-parser
  parser: "@babel/eslint-parser",
  // 为React开发环境所定制的ESlint检测环境
  extends: [
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks"
  ],
  plugins: ["jsx-a11y", "react", "react-hooks"],
  // 用于配置eslint解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  // 改变eslint规则的检测级别（三种检测级别）
  // off (0) -关闭规则
  // warn (1) -违反规则给警告
  // error (2) -违反规则给报错
  rules: {
    "no-console": 0,
    "semi": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "linebreak-style": 0,
    "react/function-component-definition": 0,
    "react/jsx-props-no-spreading": 0,
    "arrow-spacing": 0,
    "react/prop-types": 0,
    "arrow-parens": 0,
    "prefer-destructuring": 0,
    "jsx-quotes": 0,
    "lines-between-class-members": 0,
    "space-before-function-paren": 0,
    "react-hooks/exhaustive-deps": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "comma-dangle": 0,
    "object-curly-spacing": 0,
    "object-curly-newline": 0,
    "key-spacing": 0,
    "react/jsx-curly-brace-presence": 0,
    "import/newline-after-import": 0,
    "react/jsx-tag-spacing": 0,
    "react/jsx-one-expression-per-line": 0
  },
  env: {
    node: true,
    browser: true,
    es6: true
  }
}
