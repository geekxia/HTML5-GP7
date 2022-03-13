<template>
  <h1>在这里测试vue3的若干细节</h1>
  <div v-for='item in list' :ref='pushRef'>
    <span v-text='item.name'></span>
  </div>
  <!-- <AsyncChild /> -->
  <SyncChild :class='box' v-model:xx.even='xx' />
  <h2 v-highlight="'yellow'">测试指令</h2>
  <teleport to='#xxx'>
    <h1>我是穿越过去的元素</h1>
  </teleport>
  <teleport to='head'>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.css" />
  </teleport>
</template>

<script>
// import {  getCurrentInstance } from 'vue'
// const app = getCurrentInstance()
// console.log('app', app)
// app.directive('highlight', {
//   beforeMount(el, binding, vnode) {
//     el.style.background = binding.value
//   }
// })
</script>

<script setup>
import { reactive, onMounted, defineAsyncComponent, ref, getCurrentInstance } from 'vue'
const AsyncChild = defineAsyncComponent(()=>import('./components/AsyncChild.vue'))
import SyncChild from './components/AsyncChild.vue'

let list = reactive([
  { id: 1, name: '张三', age: 10 },
  { id: 2, name: '李四', age: 10 },
  { id: 3, name: '王王', age: 10 }
])

let refArr = []
const pushRef = el => {
  if (el) {
    refArr.push(el)
  }
}
onMounted(()=>{
  console.log('refArr', refArr)
  refArr[1].style.color = 'red'
})

let box = ref('box')

let xx = ref(100)

</script>

<style lang="css" scoped>
.box { color: red; }
</style>
