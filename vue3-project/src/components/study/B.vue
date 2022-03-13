<template>
  <h1>第二个组件B</h1>
  <button @click='change(-2)'>自减</button>
  <h1 class="box" v-text='count'></h1>
  <button @click='change(1)'>自增</button>
</template>

<script>
// 在script内部的代码是JS代码，在setup中访问或修改响应式变量时用.value来访问。
  // 简单记忆：如果一个声明变量能用this访问，就不加.value；反之。。。
// 在template视图模板中，访问或修改响应式变量时不要加.value，指令会自动访问变量的.value。
import { ref } from 'vue'
export default {
  // 这是vue3中新增的一个非常重要的一个选项
  // 这个setup是当前组件的入口函数，会自动执行。
  // setup中没有this。
  setup(props,ctx) {
    let count = ref(0)
    // const change = (step) => count.value += step
    console.log('setup this', this)
    return {
      count,
      // change
    }
  },
  methods: {
    change(step) {
      console.log('methods this', this)
      this.count += step
    }
  },
  watch: {
    count(newC, oldC) {
      console.log('count changed', newC, oldC)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
