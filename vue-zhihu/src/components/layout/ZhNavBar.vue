<template>
<div class="zh-navbar">
  <div class="wrap">
    <span>知乎</span>
    <div class="navs">
      <!-- v-for和v-if，不建议一起使用 -->
      <span v-for='nav in routes' :key='nav.id'>
        <router-link
          v-if='(nav.path==="/")&&(!nav.hidden)'
          :to='nav.path'
          :class='{"on": isOn}'
        >
          <span v-text='nav.text'></span>
        </router-link>
        <router-link
          v-if='(!(nav.path==="/"))&&(!nav.hidden)'
          :key='nav.id'
          :to='nav.path'
          exact-active-class='on'
        >
          <span v-text='nav.text'></span>
        </router-link>
      </span>
    </div>

    <span>
      <input type="text" />
    </span>
    <span>提问</span>
  </div>
</div>
</template>

<script>
import { routes } from '@/router'
export default {
  data() {
    return {
      routes
    }
  },
  computed: {
    isOn() {
      const p = this.$route.path
      const children = routes.find(ele=>ele.path==='/').children
      return (p==='/') || children.find(ele=>ele.path===p)
    }
  }
}
</script>

<style lang="scss" scoped>
.zh-navbar {
  line-height: 50px;
  height: 50px;
  background-color: white;
  border-bottom: 1px solid #ccc;
  &>.wrap {
    width: 800px;
    margin: 0 auto;
  }
  .navs {
    display: inline-block;
    span {
      display: inline-block;
      a {
        display: inline-block;
        span {
          display: inline-block;
          padding: 0 15px;
          border-bottom: 4px solid transparent;
        }

      }
      a.on span {
        border-color: blue;
      }
    }

  }
}
</style>
