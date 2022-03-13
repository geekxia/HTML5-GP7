<template>
<div class="zh-home">

  <div class="left">
    <div class='navs'>
      <router-link
        v-for='nav in subRoutes'
        :key='nav.id'
        :to='nav.path'
        exact-active-class='on'
      >
        <span v-text='nav.text'></span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>

  <div class="right">
    <h3>四个来自layout中的组件</h3>
  </div>

</div>
</template>

<script>
import { routes } from '@/router'

export default {
  // data() {
  //   return {
  //     routes: routes[0].children
  //   }
  // }
  computed: {
    subRoutes() {
      const p = this.$route.meta.page
      if (p) {
        const arr = routes.find(r=>r.path===p).children
        return arr
      }
      return []
    }
  },
  mounted() {
    console.log('$route', this.$route)
    console.log('$router', this.$router)
  },
  watch: {
    $route() {
      console.log('---$route', this.$route)
    }
  }
}
</script>

<style lang="scss" scoped>
.zh-home {
  display: flex;
  .left {
    flex: 5;
    background-color: white;
  }
  .right {
    flex: 2;
  }
  .navs {
    a {
      display: inline-block;
      padding: 10px 15px;
      text-decoration: none;
    }
    a.on {
      color: blue;
    }
  }
}
</style>
