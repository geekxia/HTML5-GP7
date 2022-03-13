<template>
<div class="qf-find">
  <QfNavBar>
    <template>
      <van-search shape='round' placeholder="小天鹅洗衣机" />
    </template>
    <template #action>
      <div>$$$</div>
    </template>
  </QfNavBar>


  <div class="wrap">
    <div class="left">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for='item in cateArr'
          :key='item._id'
          :title="item.cate_zh"
        />
      </van-sidebar>
    </div>
    <div class="right">
      <van-grid :column-num='3' :border='false'>
        <van-grid-item v-for='item in cache[activeKey]' :key='item._id'>
          <template>
            <div class="good">
              <img :src="$img.imgBase+item.img" alt=""/>
              <div v-text='item.name'></div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>

  <QfTabBar />
</div>

</template>

<script>
import { QfTabBar, QfNavBar } from '@/components'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Find',
  components: {
    QfTabBar,
    QfNavBar
  },
  data() {
    return {
      activeKey: 0,
      cateArr: [],
      goodArr: []
    }
  },
  computed: {
    ...mapState('good', ['cache']),
    payload() {
      const idx = this.activeKey
      return {idx,cate:this.cateArr[idx].cate}
    }
  },
  watch: {
    activeKey() {
      // 先判断cache缓存中是否有当前activeKey所对应的数据
      // Y-直接使用，不调接口
      // N-再走vuex流程
      if(!this.cache[this.activeKey]) this.getList(this.payload)
    }
  },
  async created() {
    const res = await this.$api.fetchAllCate()
    this.cateArr = res.list
    // 触发并调用actions方法
    this.getList(this.payload)
  },
  methods: {
    ...mapActions('good', ['getList']),
    ...mapMutations('good', ['cleanCache'])
  },
  beforeDestroy() {
    this.cleanCache()
  }
}
</script>

<style lang="scss" scoped>
.qf-find {
  .wrap {
    position: absolute;
    bottom: 1.33rem;
    right: 0;
    left: 0;
    top: 1.07rem;
    .left {
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      width: 2.27rem;
      overflow-y: scroll;
      // css 去除滚动条
    }
    .right {
      position: absolute;
      bottom: 0;
      left: 2.27rem;
      top: 0;
      right: 0;
      background-color: white;
      overflow-y: scroll;
      padding: .27rem;
      // css 去除滚动条
      .good {
        font-size: .32rem;
        text-align: center;
        img {
          display: inline-block;
          width: 1.87rem;
          height: 1.87rem;
        }
      }
    }
  }
}

.van-sidebar {
  width: 100%;
  .van-sidebar-item {
    height: 1.23rem;
    line-height: .24rem;
    border: none;
    .van-sidebar-item__text {
      // height: 1.23rem;
      // line-height: 1.23rem;
    }

  }
  .van-sidebar-item--select::before {
    display: none;
  }
  .van-sidebar-item--select {
    color: #e93b3d;
  }
}
</style>
