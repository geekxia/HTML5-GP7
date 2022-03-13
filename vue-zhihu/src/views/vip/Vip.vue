<template>
<div>
  <h1>会员页面</h1>
  <VipTop />
  <hr>
  <VipBot />
</div>
</template>

<script>
import VipBot from './components/VipBot.vue'
import VipTop from './components/VipTop.vue'
export default {
  components: { VipTop, VipBot }
}
</script>

<style lang="css" scoped>
</style>
