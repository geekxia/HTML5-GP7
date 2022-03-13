// 这是build时的专用配置
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const QfCleanPlugin = require('./plugins/qf-clean-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  // 优化
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },
  module: {
    rules: [
      // 处理样式模块（v4和v5的写法是一样的）
      // 注意1：当同一个项目中使用sass、less、postcss、stylus等多种css预处理器时，我们要分别编写多条样式模块的解析规则。如果只有一种css预处理器，我们通常把处理.css的loader和处理当前这种css预处理器的loader写在一起。
      // 注意2：当同一条规则需要多个loader协同完成任务时，要注意loaders的顺序，数组中后面的loader先工作。
      // 注意3：一般我们很少使用style-loader，而应该使用。。。。把css代码抽离成样式的文件。

      // sass-loader用于加载.scss/.sass文件的，要交给sass编译器进行编译。（要特别注意node版本、webpack版本和sass-loader版本之间的兼容性）
      // node v12+   sass-loader v12+   webpack v5
      // node v12-   sass-loader v10-   webpack v4
      // { test: /\.(css|scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(css|scss|sass)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
    ]
  },
  plugins: [
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    }),
    // 开启bundle分析功能
    new BundleAnalyzerPlugin({
      analyzerPort: 8888,
      openAnalyzer: true
    }),
    // 测试自定义的plugin
    new QfCleanPlugin()
  ],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '../node_modules/react/umd/react.production.min.js')
    }
  }
}
