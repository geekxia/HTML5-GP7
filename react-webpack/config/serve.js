// 这是serve时的专用配置

const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')


module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  optimization: {
    minimize: false
  },
  cache: { type: 'memory' },

  // 仅对开发环境起作用的loaders规则
  module: {
    rules: [
      // 【在v4中配置eslist的检测规则】
      // exclude 忽略对某种目录或文件的检测
      // enforce:'pre' 这条规则是一条前置规则，发生一般规则之前。只有当这条规则验证通过了，后面的一般规则才会运行。
      // eslint-loader 专门用于加载javascript文件，然后交给eslint系列的检测工具进行检测。所以，我们还要安装很多合适的eslint检测工具，并在项目中添加eslint的相关配置文件。
      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   use: [{loader:'eslint-loader', options: {}}],
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // }

      {
        test: /\.(css|scss|sass)$/,
        // include: /src/,
        // use: ['cache-loader', 'style-loader', 'css-loader', 'sass-loader'] },
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },

  plugins: [
    // v5中集成ESLint检测
    new ESLintPlugin({
      eslintPath: 'eslint',
      extensions: ['js','jsx','ts','tsx'],
      exclude: 'node_modules'
    })
  ],

  // 本地服务配置（前提是要安装webpack-dev-server）
  // 本地服务只对development环境起作用
  devServer: {
    port: 8080,
    open: true,
    // HMR 热模块替换技术（Hot Module Replacement）
    // 在v4中实现热更新，webpack.HotModuleReplacementPlugin
    // 在v5中热更新功能默认就是开启的，不需要再使用其它插件来实现
    // 背后原理：devServer启动时会开启一个websocket长连接，当本地代码发生变化时，通过websocket把变化的代码推送到客户端中，客户端就更新了。
    hot: true,
    // v4中有contentBase
    // contentBase: path.resolve(__dirname, 'public')

    // v5中要使用html-webpack-plugin实现静态资源目录和src的组装
    // v5中默认的静态资源目录就是public
    // static: path.resolve(__dirname, '../dist'),

    client: {
      progress: true,
      // 添加报错覆盖层
      overlay: {
        errors: true,
        warnings: false
      }
    },
    compress: false,
    proxy: {
      '/api': {
        target: 'https://cnodejs.org',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '../node_modules/react/umd/react.development.js')
    }
  }
}
