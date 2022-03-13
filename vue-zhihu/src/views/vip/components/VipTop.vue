<template>
<div class="qf-vip-top">
  <h3>vip top</h3>
  <h3 v-text='count'></h3>
  <h3>音乐长度：<span v-text='musicLeng'></span></h3>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import { qfMapState } from '@/utils/map'

export default {
  name: 'VipTop',
  computed: {
    ...mapState('study', ['count']),
    // ...qfMapState('study', ['count']),
    ...mapGetters('study', ['musicLeng'])
  },
  mounted () {
    // 原则1：不建议$store.state.count这么使用store
    console.log('$store', this.$store)
  }
}
</script>

<style lang="scss" scoped>
</style>
