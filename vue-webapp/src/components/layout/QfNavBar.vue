<template>
<div class="qf-navbar">
  <!-- 顶部导航 -->
  <van-nav-bar
    left-arrow
    @click-left='$router.back()'
  >
    <template #title>
      <slot>千锋商城</slot>
    </template>
    <template #right>
      <slot name='action'>
        <div>...</div>
      </slot>
    </template>
  </van-nav-bar>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.qf-navbar {
  .van-nav-bar__title {
    width: 7.73rem;
    max-width: 100%;
  }
}
</style>
