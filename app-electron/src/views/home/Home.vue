<template>
<div>
  <h1>我是HOME首页</h1>
  <h1 v-text='token'></h1>
</div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Home extends Vue {
  @State(state=>state.user.token) token
  mounted() {
    console.log('token', this.token)
  }
}
</script>

<style lang="css" scoped>
</style>
