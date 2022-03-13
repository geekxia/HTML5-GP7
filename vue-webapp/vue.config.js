module.exports = {
  devServer: {
    port: 8001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://10.36.150.25:9999',
        changeOrigin: true
      }
    }
  }
}
