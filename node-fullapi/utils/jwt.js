const jwt = require('jsonwebtoken')

// 生成token
function creataToken(user) {
  return jwt.sign(
    {
      data: user,   // 进行加密处理的用户信息
      iat: Math.floor(Date.now()/1000) + 3600*24*7 // 设定token的有效期（单位：秒）
    },
    'qf'
  )
}

// 解析token
function verifyToken(ctx) {
  return new Promise((resolve, reject)=>{
    const token = ctx.headers.authorization
    try {
      // 如果token反解析成功
      var decoded = jwt.verify(token, 'qf')
      console.log('--decoded', decoded)
      resolve(decoded.data)  // .then()
    } catch(err) {
      console.log('err', err)
      // reject(err)  // .catch()

    }
  })
}

module.exports = {
  creataToken,
  verifyToken
}