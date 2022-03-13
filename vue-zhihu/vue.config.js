// vue.config.js 是基于webpack v4的二次封装
// webpack要运行node环境中，所在这里你编写任何node代码

// 每次修改这个配置文件，都要重启项目才能生效

module.exports = {
  // 是用webpack-dev-server来实现
  // 代理是使用http-proxy-middleware实现
  devServer: {
    proxy: {
      '/splcloud': {
        // 这个target是远程服务器
        target: 'https://c.y.qq.com',
        changeOrigin: true
      }
    }
  }
}
