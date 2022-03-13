<template>
  <button v-text='text' @click='$emit("qfclick", 100)'></button>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '千锋点击' }
  }
}
</script>

<style lang="scss" scoped>
</style>
