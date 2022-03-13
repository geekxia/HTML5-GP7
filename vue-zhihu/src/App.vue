<template>
  <div id="app">

    <ZhNavBar />

    <div class="container">
      <!-- 用于显示当前地址栏中url所对应的vue组件 -->
      <keep-alive>
        <router-view name='alive'></router-view>
      </keep-alive>
      <router-view name='default'></router-view>
    </div>

  </div>
</template>

<script>
import { ZhNavBar } from '@/components'
export default {
  name: 'App',
  components: {
    ZhNavBar
  }
}
</script>

<style>
html,body { padding: 0; margin: 0; background: #eee; }
.container { width: 800px; margin: 5px auto; min-width: 800px; }
</style>
