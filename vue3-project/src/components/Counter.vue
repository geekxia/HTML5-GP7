<template>
  <h1 v-text='num'></h1>
</template>

<script>
  // import { toRefs } from 'vue'
  // export default {
  //   props: {
  //     num: { type: Number, default: 0 }
  //   },
  //   setup(props, ctx) {
  //     const p = toRefs(props)
  //     console.log('counter props', props)
  //     return {
  //       num: p.num
  //     }
  //   }
  // }
</script>

<script setup>

  import { toRefs, defineProps, inject } from 'vue'
  let props = defineProps({
    num: { type: Number, default: 0 }
  })
  const { num } = toRefs(props)
  // console.log('counter props', props)

  const src = inject('src')
  const user = inject('user')
  console.log('src', src, 'user', user)

</script>
