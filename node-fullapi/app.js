const Koa = require('koa')
const app = new Koa()
const path = require('path')
const NODE_ENV = process.env.NODE_ENV

// 静态资源
app.use(require('koa-static')(path.resolve(__dirname, 'public')))
// 连接数据库
require('./utils/connect')
// 连接socket服务器
require('./utils/socket')

// 用于解析body体中数据的中间件
// 开启koa-body对文件数据的解析，默认只能普通post提交的body数据
app.use(require('koa-body')({multipart:true}))

// 动态资源（RESTful API）
if (NODE_ENV==='vue') {
  app.use(require('./routes/vue').routes())
}
if (NODE_ENV==='react') {
  console.log('NODE_ENV', NODE_ENV)
  app.use(require('./routes/react').routes())
}

app.use(require('./routes/index').routes())

app.listen(9999, ()=>console.log(`${NODE_ENV} server in running on 9999`))
