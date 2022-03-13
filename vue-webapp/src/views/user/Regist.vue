<template>
<div class="qf-regist">
  <QfNavBar>
    <template>注册</template>
    <template #action>
      <div>登录</div>
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
    <van-field
      v-model="form.password2"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { QfNavBar } from '@/components'
export default {
  components: { QfNavBar },
  data() {
    return {
      form: {
        username: '',
        password: '',
        password2: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('注册', this.form)
      // 数据校验
      this.$api.fetchRegist(this.form).then(()=>{
        this.$toast({
          type: 'success',
          message: '注册成功'
        })
        this.timer = setTimeout(()=>{
          this.$router.replace('/login')
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
