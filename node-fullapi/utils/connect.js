const mongoose = require('mongoose')

// 连接MongoDB服务器
const NODE_ENV = process.env.NODE_ENV
const db = NODE_ENV==='react' ? 'gp77' : 'gp7'
mongoose.connect(`mongodb://localhost:27017/${db}`, {})

const conn = mongoose.connection
conn.on('open', ()=>console.log('数据库连接成功'))
conn.on('error', ()=>console.log('数据库连接失败'))
