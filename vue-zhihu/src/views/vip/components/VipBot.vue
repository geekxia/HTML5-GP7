<template>
<div class="qf-vip-bot">
  <h3>vip bot</h3>
  <h3 v-text='count'></h3>
  <button @click='change("add")'>自增</button>
  <button @click='change("sub")'>自减</button>
  <hr>

  <div v-for='item in list' :key='item.n' v-text='item.k'></div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('study', ['list', 'count'])
  },
  created() {
    // this.$api.fetchQqList({}).then(res=>{
    //   console.log('音乐接口', res)
    //   this.list = res.hotkey
    // })

    // 使用$store.dispatch()派发并触发一个actions方法去调接口
    // this.$store.dispatch('study/getList', {ct:10})
    this.getList({ct:10})
  },
  methods: {
    ...mapActions('study', ['getList']),
    ...mapMutations('study', ['changeCount']),
    change(type) {
      // 1、【不建议】直接修改store中数据
      // this.$store.state.count++
      // 2、【建议】使用$store.commit()提交并触发一个mutations方法去修改store数据
      // this.$store.commit('study/changeCount', {type, step: 2})
      this.changeCount({type, step: 2})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
