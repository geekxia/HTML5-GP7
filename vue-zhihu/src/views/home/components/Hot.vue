<template>
<div class="qf-home-hot">
  <div class='cates'>
    <span
      v-for='c in cates'
      :key='c.id'
      v-text='c.cate_zh'
      @click='cateClick(c)'
      :class='{"on": cate===c.cate}'
    />
  </div>

  <!-- 热榜列表 -->
  <div class='list'>
    <div v-for='item in list' :key='item.id'>
      <span v-text='item.title' @click='skipTo(item)'></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      cates: [
        { id: 1, cate: '', cate_zh: '全站' },
        { id: 2, cate: 'science', cate_zh: '科学' },
        { id: 3, cate: 'digital', cate_zh: '数码' }
      ],
      list: [
        { id: 1, title: '如何看待京沪两地法学生起诉苹果不送充电器？用户有可能胜诉吗？'},
        { id: 2, title: '如何看待上海闵行区公务员招录，要求海外硕士学位的学制最少为 2 年？'},
        { id: 3, title: '写了五十页全英文，现在大学生的作业量都这么多吗？'}
      ]
    }
  },
  computed: {
    cate() {
      console.log('cate', this.$route.query.list)
      return this.$route.query.list
    }
  },
  watch: {
    cate() {
      // this.list = (this.cates.find(e=>e.cate===this.cate)).cate_zh
      console.log('调接口')
    }
  },
  methods: {
    cateClick(c) {
      console.log('c', c)
      // this.list = c
      this.$router.push(`${this.$route.path}?list=${c.cate}`)
    },
    skipTo(item) {
      // 动态路由传参 + Query传参
      this.$router.push(`/hot/${item.id+''}?a=1&b=2&c=3`)
    }
  }
}
</script>

<style lang="scss" scoped>
.cates {
  span {
    display: inline-block;
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
    font-size: 14px;
  }
  span.on {
    background-color: rgba(240,240,240,.8);
    color: blue;
  }
}
.list {
  &>div {
    cursor: pointer;
    box-sizing: border-box;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding: 0 15px;
  }
}
</style>
