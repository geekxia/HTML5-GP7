<template>
<div class="qf-user">
  <QfNavBar>
    <template>个人中心</template>
  </QfNavBar>

  <div>头像、积分。。</div>

  <div>

    <van-cell icon='wap-home' value="内容" is-link>
      <template #title>
        <span class="custom-title">地址簿管理</span>
        <!-- <van-tag type="danger">标签</van-tag> -->
      </template>
    </van-cell>

    <van-cell  icon="shop-o" title="单元格">
      <template #right-icon>
        <van-icon name="search" class="search-icon" />
      </template>
    </van-cell>

    <van-cell icon="setting" title="设置" is-link>
      <!-- <template #right-icon>
        <van-icon name="search" class="search-icon" />
      </template> -->
    </van-cell>

  </div>



  <QfTabBar />
</div>
</template>

<script>
import { QfTabBar, QfNavBar } from '@/components'
export default {
  components: {
    QfTabBar,
    QfNavBar
  },
  // 局部守卫
  beforeRouteEnter(to,from,next) {
    // 在这时候当前组件还没有实例化
    // 所以在这里是无法访问this的
    // const isLogin = false
    // if(isLogin) next()
    // else location.href = '#/login'
    next()
  }
}
</script>

<style lang="scss" scoped>
</style>
