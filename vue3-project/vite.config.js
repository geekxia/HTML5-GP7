// Vite的配置文件，支持ES6模块化、也支持CommonJS模块化

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 从vite的角度来支持JSX语法
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    })
  ],
  // 在本地模拟生产环境的代码运行
  preview: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://cnodejs.org',
        changeOrigin: true
      }
    }
  }
})
