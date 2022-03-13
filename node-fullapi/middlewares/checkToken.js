const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
	// 从上下文取出token
  const token = ctx.headers.authorization
  // console.log('token---', token)
  if (token) {
    try {
      var decoded = jwt.verify(token, 'qf')
      // console.log('decoded', decoded)
      // 把反解析成功的用户信息放在上下文，交给下一个中间件
      ctx.user = decoded.data

      // 只有成功时，才去到下一个中间件
      await next()
    } catch(err) {
      // console.log('err', err)
      ctx.body = { err: -1, msg: 'token无效', data: {}}
      // 如果失败，都不能交给下一个中间件
    }
  } else {
    ctx.throw(401, 'token不存在')
    // 如果失败，都不能交给下一个中间件
  }
}
