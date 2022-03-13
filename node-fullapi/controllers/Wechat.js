const axios = require('axios')
const jwt = require('../utils/jwt')
class Wechat {
  // 图片上传
  static async login(ctx) {
    const { code } = ctx.request.query
    console.log('code', code)
    // 调微信服务器接口
    const res = await axios({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      method: 'GET',
      params: {
        appid: 'wx2f8b38986e5e2ccf',
        secret: 'd21523fa93df9d5a2e14f65b5b8d4729',
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    const token = jwt.creataToken(res.data)
    ctx.body = { err:0, msg: 'success', data: { token } }
  }
}

module.exports = Wechat
