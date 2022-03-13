<template>
  <div class='article-list'>
    <div class='article' v-for='row in list'>
      <img :src='row.author.avatar_url' />
      <div class='num'>
        <span v-text='row.reply_count'></span>
        <span>/</span>
        <span v-text='row.visit_count'></span>
      </div>
      <span
        v-if='(row.top || row.good || row.first)'
        v-text='row.label'
        :class='{
          label: true,
          on: (row.top || row.good)
        }'>
      </span>
      <span class='title' v-text='row.title'></span>
      <span class='time' v-cloak>{{time(row.last_reply_at)}}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  list: { type: Array, default: [] }
})
const time = (val) => {
  const s = (Date.now()-Date.parse(val))/1000
  return (
    s/60 < 1
      ? Math.floor(s)+' 秒前'
      : s/60/60 < 1
        ? Math.floor(s/60)+' 分钟前'
        : s/60/60/24 < 1
          ? Math.floor(s/60/60)+' 小时前'
          : s/60/60/24/30 < 1
            ? Math.floor(s/60/60/24)+' 天前'
            : s/60/60/24/30/12 < 1
              ? Math.floor(s/60/60/24/30)+' 月前'
              : Math.floor(s/60/60/24/30/12)+' 年前'
  )
}
</script>

<style lang="css" scoped>
</style>
