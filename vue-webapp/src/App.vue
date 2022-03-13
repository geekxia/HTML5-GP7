<template>
<div>
  <keep-alive>
    <router-view name='alive'></router-view>
  </keep-alive>
  <router-view></router-view>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState('user', ['token', 'userinfo'])
  },
  watch: {
    $route (to) {
      const authRoute = ['/cart', '/user']
      if (this.token && !this.userinfo._id) {
        // 只有当token存在、并且用户信息不存在时，才去走流程获取用户信息
        this.getUserInfo().then(res=>{
          if (res.userinfo) {
            // 说明token有效，拿到了真实的信息，放进vuex中去
            this.updateUserInfo(res.userinfo)
          } else {
            // 说明token无效，后端给的err = -1
            if (authRoute.includes(to.path)) {
              // 当token无效，并且你正在访问“有权限的页面”，跳转到登录
              this.$router.push('/login')
              // 跳转/login后出现白屏，why？？？
            }
          }
        })
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    ...mapMutations('user', ['updateUserInfo'])
  }
}
</script>

<style>
</style>
