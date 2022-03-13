<template>
  <router-link to='/find' custom v-slot='scope'>
    <NavLink text='你好' :scope='scope' />
  </router-link>
  <router-view></router-view>

</template>

<script setup>
  import NavLink from '@/components/NavLink.vue'
</script>

<style>
.app {
  width: 750px;
  margin: 0 auto;
}
img {
  display: block;
  margin: 20px auto;
}
.box {
  display: inline-block;
  padding: 0 20px;
}
</style>
