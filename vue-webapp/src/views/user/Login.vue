<template>
<div class="qf-login">
  <QfNavBar>
    <template>登录</template>
    <template #action>
      <div>注册</div>
    </template>
  </QfNavBar>

  <van-form @submit="onSubmit">
    <van-field
      v-model="form.username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="form.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { QfNavBar } from '@/components'
import { mapActions } from 'vuex'
export default {
  components: { QfNavBar },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    console.log('login page created')
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit() {
      // 数据校验
      this.login(this.form).then(()=>{
        this.$toast({
          type: 'success',
          message: '登录成功'
        })
        this.timer = setTimeout(()=>{
          this.$router.back()
        }, 2000)
      })
    }
  },
  beforeDestory() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
</style>
