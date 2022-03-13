<template>
<div class="qf-tabbar">
  <van-tabbar
    v-model="active"
    active-color='#fa2c19'
    route
  >
    <van-tabbar-item
      v-for='tab in tabArr2'
      :to='tab.path'
      :key='tab.id'
      :dot='tab.dot'
    >
      <template #icon='scope'>
        <div class="tab">
          <img :src='$img[`i${tab.icon}${scope.active?"On":""}`]' />
          <div v-text='tab.text'></div>
        </div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import { mapState } from 'vuex'
import deepCopy from '@/utils/copy'
export default {
  data() {
    return {
      active: 1,
      tabArr: [
        { id: 1, icon: 'Home', path: '/', text: '首页', dot: false },
        { id: 2, icon: 'Find', path: '/find', text: '品类', dot: false },
        { id: 3, icon: 'Cart', path: '/cart', text: '购物车', dot: false },
        { id: 4, icon: 'User', path: '/user', text: '未登录', dot: false }
      ]
    }
  },
  computed: {
    ...mapState('user', ['userinfo']),
    tabArr2() {
      // 以后做这种鉴权判断，建议使用用户信息
      const arr = deepCopy(this.tabArr)
      if (this.userinfo && this.userinfo._id) {
        arr[3].text = '我的'
      }
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-tabbar {
  .tab {
    font-size: .32rem;
    text-align: center;
    img {
      display: inline-block;
      border-radius: 50%;
    }
  }
}
</style>
