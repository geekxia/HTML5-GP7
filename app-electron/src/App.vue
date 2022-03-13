<template>
  <div>
    <router-view></router-view>
    <!-- <h1 class="box">Hello {{msg}}</h1>
    <QfChild msg='hello child' />
    <hr>
    <QfButton /> -->
  </div>
</template>

<script>
import QfChild from './components/QfChild.vue'
import QfButton from './components/QfButton.js'

import { Vue, Component } from 'vue-property-decorator'

@Component({
  components:{ QfChild,QfButton }
})
export default class App extends Vue {
  msg = 'GP7'
  mounted() {
    console.log('app mounted')
  }
}
</script>

<style lang="css">
.box { color: red; }
body { text-align: center; }
</style>
