<template>
  <span v-text='text' @click='skip'></span>
</template>

<script>
import { toRefs } from 'vue'
export default {
  props: {
    text: String,
    scope: Object
  },
  emits: ['navigate'],
  setup(props, ctx) {
    const { href, navigate } = props.scope
    const skip = () => {
      navigate(href)
    }
    return {
      ...toRefs(props),
      skip
    }
  }
}
</script>

<style lang="css" scoped>
</style>
