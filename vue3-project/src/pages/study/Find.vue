<template>

  <h1 ref='box' id='box'>测试ref操作</h1>
  <button @click='setBox'>改变颜色</button>

  <h1 v-show='bol'>我是一行可有可无的文字</h1>
  <button @click='setBol'>Toggle</button>
  <hr>

  <h1 v-text='d2'></h1>
  <button @click='setD2'>自增</button>
  <hr>

  <!-- <Counter :num='num' /> -->
  <button @click='num++'>自增</button>
  <hr>

  <h1 v-text='e.e1.e2'></h1>
  <button @click='changeE2'>更新[e.e1.e2]</button>
</template>

<script setup>
import { useApp, useDom, useToggle, useDD } from './compositions'
import { useRoute, useRouter } from 'vue-router'
import { useLocation, useSelector } from '@/hooks'
import { useStore, mapState } from 'vuex'

// import Counter from '@/components/Counter.vue'
import { ref, unref, toRef, toRefs, reactive, shallowRef, triggerRef, provide } from 'vue'

// 在组合中使用ref操作(属性)
const [box, setBox] = useDom()
const [bol, setBol] = useToggle()
const [d2, setD2] = useDD()

let b = 200

// 把基本数据类型变成响应式的,直接用ref就行了.
let c = 'hello'
let c1 = ref(c)
console.log('----c1', c1)

let num = ref(10000)

let e = shallowRef({ e1: { e2: 300 }})
console.log('----e', e)
const changeE2 = () => {
  // e.value.e1.e2++
  // e.value.e1 = { e2: 500 }
  triggerRef(e)
}

provide('src', 'http://baidu.com')
provide('user', { name:'user',age:90})

const $http = useApp('$http')
console.log('$http', $http)

const { pathname } = useLocation()
const router = useRouter()
console.log('pathname', pathname, 'router', router)

</script>

<style lang="css" scoped>
</style>
