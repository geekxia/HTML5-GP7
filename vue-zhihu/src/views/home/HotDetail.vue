<template>
<div class="qf-hot-detail">
  <h1>热榜文章的详情页</h1>
</div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true }
  },
  created() {
    console.log('$route id', this.$route)
    console.log('props id', this.id)
  }
}
</script>

<style lang="css" scoped>
</style>
