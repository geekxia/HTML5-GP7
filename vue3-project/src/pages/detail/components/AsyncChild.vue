<template>
  <h2>我是反应较慢的孩子</h2>
  <h2 v-text='xx'></h2>
  <button @click='handle'>测试[v-model]的事件</button>
</template>

<script>
import { useAttrs, defineProps, toRefs } from 'vue'
// const attrs = useAttrs()
// const props = defineProps({
//   class: String
// })
// console.log('child attrs', attrs.class)
// console.log('child props', props.class)

export default {
  props: {
    xx: Number,
    class: String,
    modelValue: String,
    xxModifiers: { default: () => ({}) }
  },
  emits: ['update:xx'],
  setup(props, ctx) {
    console.log('child props xxModifiers', props.xxModifiers)
    console.log('child ctx', ctx.attrs.class)
    const handle = () => {
      // 触发update:xx访问，并回传数据给父组件中的v-model:xx
      const newXx = props.xx
      console.log('newXx', props.xx)
      const { odd } = props.xxModifiers
      ctx.emit('update:xx', odd?newXx+1:newXx+2)
    }
    return {
      handle,
      ...toRefs(props)
    }
  },
  // mounted() {
  //   console.log('this $attrs', this.$attrs)
  //   console.log('this $parent', this.$parent)
  //   console.log('this xxModifiers', this.xxModifiers)
  // }
}
</script>

<style lang="css" scoped>
</style>
