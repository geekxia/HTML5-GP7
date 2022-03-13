<template>
  <div>
    <h2 v-text='msg'></h2>
    <h2 v-text='count'></h2>
    <button @click='sub'>自减</button>
    <button @click='add'>自增</button>
    <hr>
    <input type="text" v-model='total' />
    <hr>
    <h1 v-text='token'></h1>
  </div>
</template>

<script>

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class QfChild extends Vue {
  @Prop({ default:'qf'}) msg

  count = 1
  add() {
    this.count++
  }
  sub() {
    this.count--
  }

  @Watch('count')
  onChildChanged(val, oldVal) {
    console.log('count change', val, oldVal)
  }

  get total() {
    return this.count * 100
  }
  set total(val) {
    this.count = val / 100
  }

  mounted() {
    console.log('QfChild mounted')
  }
}

</script>

<style lang="css" scoped>
</style>
