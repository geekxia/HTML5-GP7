<template>
  <h1>第一个组件A</h1>
  <button @click='sub'>自减</button>
  <h1 class="box" v-text='count'></h1>
  <button @click='add'>自增</button>
</template>

<!-- 在script标签加了setup属性，那么被包裹的js代码相当于setup选项。 -->
<script setup>
  import { ref, useCssModule } from 'vue'
  let count = ref(0)
  const add = () => {
    console.log('count', count, typeof count)
    count.value++
  }
  const sub = () => count.value--

</script>

<style scoped>
</style>
