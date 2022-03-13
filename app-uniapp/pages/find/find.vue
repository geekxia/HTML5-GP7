<template>
  <web-view :src='src'></web-view>
</template>

<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  onLoad(opt) {
    console.log('find opt', opt)
    // this.src = `https://m.jd.com/detail.html?id=${opt.id}`
    this.src = `/hybrid/html/canvas.html?id=${opt.id}`
  }
}
</script>

<style lang="css" scoped>
</style>
