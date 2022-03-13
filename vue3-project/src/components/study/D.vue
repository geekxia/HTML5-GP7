<!-- <template>
  <h1>第四个组件D</h1>
  <button @click='count--'>自减</button>
  <h1 class="box" v-text='count'></h1>
  <button @click='count++'>自增</button>
</template> -->

<script>
import { defineComponent, ref, h } from 'vue'
// 语法1：defineComponent({}) 在选项中可以使用setup、methods、。。。
// 语法2：defineComponent(fn) 这个fn就是setup函数。

export default defineComponent(() => {
  let count = ref(0)
  const sub = () => {
    console.log('---sub', count.value)
    count.value--
  }
  const add = () => count.value++
  return ()=>h(
    'div',
    {},
    [
      h('h1', {}, '第四个组件D'),
      h('button', { onClick: sub }, '自减'),
      h('h1', {class:'box'}, count.value),
      h('button', { onClick: add }, '自增')
    ]
  )
})
</script>

<style lang="css" scoped>
</style>
