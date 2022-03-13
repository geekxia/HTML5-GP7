const api = require('./utils/request')
// 注册小程序：只一个小程序中，只有一个App组件
App({
  onLaunch() {
    // onLaunch是一个生命周期，只有App才有，是入口
    // 这是小程序真正登录的地方
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('code', res.code)
        api.login({code: res.code}).then(res=>{
          console.log('登录成功', res)
          wx.setStorageSync('token', res.token)
        })
      }
    })
    // 请求获取用户的地理位置授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          // 这是小程序中唯一的一个能够自动弹出的授权请求框
          wx.authorize({
            scope: 'scope.userLocation',
            success (res) {
              console.log('用户同意了位置授权', res)
            },
            fail(err) {
              console.log('用户拒绝了位置授权', err)
            }
          })
        }
        console.log('当前用户已经授权过的权限列表', res.authSetting)
      }
    })
  },
  // 放在小程序应用最顶层的数据（不具备响应式）
  globalData: {
    userInfo: null
  }
})
