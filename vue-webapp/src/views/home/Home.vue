<template>
<div
  class="qf-home"
  style='font-size:20px;'
  v-scroll
  ref='page'
  @scroll='top=$event.srcElement.scrollTop'>

  <van-pull-refresh v-model="refreshing" @refresh="page=1">

    <!-- 通知栏 -->
    <van-notice-bar v-if='notice'>
      <template>
        <div class="vnb-text">打开京东App，购物更轻松</div>
      </template>
      <template #right-icon>
        <div class="vnb-open">立即打开</div>
      </template>
      <template #left-icon>
        <div class='vnb-left'>
          <span @click='notice=false'>X</span>
          <span><img :src='$img.iJD' alt=""></span>
        </div>
      </template>
    </van-notice-bar>

    <!-- 搜索 -->
    <van-search
      show-action
      background='#18193E'
      :placeholder="text"
      shape='round'
      disabled
    >
      <template #action>
        <div class="login" @click="onLogin">登录</div>
      </template>
      <template #left>
        <div class="nav">三</div>
      </template>
      <template #label>
        <div class='label'>
          <span>JD</span>
          <span>|</span>
        </div>
      </template>
    </van-search>

    <!-- 轮播图 -->
    <van-swipe class="qf-swipe" :autoplay="3000" indicator-color='#fa2c19'>
      <van-swipe-item v-for="item in images" :key="item.id">
        <img v-lazy="item.src" />
      </van-swipe-item>
    </van-swipe>

    <!-- 品类 -->
    <van-swipe class="qf-cate" :loop='false' indicator-color='#fa2c19'>
      <van-swipe-item>
        <van-grid :column-num='5' :border='false'>
          <van-grid-item
            v-for='i in 10' :key='i'
            icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg.dpg"
            text="京东超市"
          />
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid :column-num='5' :border='false'>
          <van-grid-item
            v-for='i in 10' :key='i'
            icon="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/175540/24/19329/6842/60ec0b0aEf35f7384/ec560dbf9b82b90b.png!q70.jpg.dpg"
            text="京东超市"
          />
        </van-grid>
      </van-swipe-item>
    </van-swipe>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="page++"
      :immediate-check='false'
      offset='150'
    >
      <GoodList :list='list' />
    </van-list>
  </van-pull-refresh>

  <QfTabBar />
</div>
</template>

<script>
import { QfTabBar } from '@/components'
import GoodList from './components/GoodList.vue'
import { Swipe, Grid } from 'vant'
export default {
  name: 'Home',
  components: {
    QfTabBar,
    GoodList,
    [Swipe.name]: Swipe,
    [Grid.name]: Grid
  },
  data() {
    return {
      notice: true,
      hotArr: [
        { id: 1, text: '儿童运动鞋' },
        { id: 2, text: '立柜式空调' },
        { id: 3, text: '机械键盘' }
      ],
      images: [
        { id: 1, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/181068/13/16622/771845/6102a71aE15dbe36e/c7f4953bb30e1efe.png!cr_1053x420_4_0!q70.jpg.dpg'},
        { id: 2, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/198829/36/14040/65895/61712053Ec3a8dfb7/124a0bb71ea68d58.jpg!cr_1053x420_4_0!q70.jpg.dpg'},
        { id: 3, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/213829/2/2037/64744/6178f13aEea971783/d95379f7af10919e.jpg!cr_1053x420_4_0!q70.jpg.dpg'}
      ],
      // 表示正在“触底加载”，如果当前加载正在进行，下一次load事件将不再被触发
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      top: 0    // 记录滚动条的位置
    }
  },
  computed: {
    text() {
      return this.hotArr[Math.floor(Math.random()*this.hotArr.length)].text
    }
  },
  created() { this.getList() },
  activated() {
    // 每次页面激活时，把页面滚动到上次离开时的位置
    this.$refs.page.scrollTop = this.top
  },
  watch: {
    loading() {
      if(this.loading) this.getList()
    },
    refreshing() {
      if(this.refreshing) this.getList()
    }
  },
  methods: {
    getList() {
      const params = { size: 6, page: this.page }
      this.$api.fetchGoodList(params).then(res=>{
        console.log('商品列表', res)
        if (this.page==1) {
          this.list = res.list
          this.refreshing = false
          this.finished = false
        } else {
          // 把分页数据合并到this.list上
          this.list = [...this.list, ...res.list]
          this.loading = false
          // 判断是否到底了：判断数据库还有没有数据
          this.finished = (this.list.length === res.total)
        }
        // 加载完成，保证下一次触底功能也是正常的
        this.loading = false
      })
    },
    onLogin () {
      console.log('登录')
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-home {
  background-color: rgba(247, 247, 247, 1);
  padding-bottom: 2rem;
  .van-notice-bar {
    height: 1.2rem;
    padding-right: 0;
    padding-left: 0;
    .vnb-open {
      background: #f63515;
      height: 100%;
      width: 2.51rem;
      text-align: center;
      line-height: 1.2rem;
      color: white;
    }
    .vnb-left {
      background-color: black;
      width: 1.6rem;
      height: 100%;
      line-height: 1.2rem;
      &>span {
        display: inline-block;
        width: .8rem;
        text-align: center;
        height: 100%;
        color: white;
      }
      &>span:last-child {
        img {
          display: inline-block;
          width: .8rem;
          height: .8rem;
          vertical-align: middle;
        }
      }
    }
  }
  .van-search {
    height: 1.17rem;
    .van-search--show-action {
      padding-left: 0;
    }
    .van-search__content {
      height: .8rem;
      line-height: .8rem;
    }
    .van-search__action {
      padding-right: 0;
    }
    .login {
      width: 1.07rem;
      color: white;
    }
    .nav {
      font-size: .53rem;
      color: white;
      width: 1.07rem;
    }
  }
  .van-swipe.qf-swipe {
    background-color: #18193E;
    padding: .13rem;
    .van-swipe-item {
      height: 3.73rem;
      width: 100%;
      img {
        display: block;
        width: 9.33rem;
        height: 100%;
        margin: 0 auto;
        border-radius: .16rem;
      }
    }
  }
  .van-swipe.qf-cate {
    height: 4.32rem;
    .van-swipe-item {
      height: 100%;
      background-color: rgba(246, 246, 246, 1);
    }
  }
}
</style>

<style lang='scss'>
.van-notice-bar__wrap {
  width: 5.68rem;
  .van-notice-bar__content {
    display: block;
    height: 100%;
    width: 100%;
    .vnb-text {
      background-color: black;
      height: 100%;
      font-size: .37rem;
      text-align: center;
      color: white;
      line-height: 1.2rem;

    }
  }
}
.van-grid-item__content {
  // height: 1.08rem;
  height: 2.16rem;
  background-color: rgba(246, 246, 246, 1);
}
.van-swipe__indicators {
  bottom: .11rem;
}
</style>
