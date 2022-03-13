const { Server } = require('socket.io')
const http = require('http')

const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8002",
    methods: ["GET", "POST"]
  }
})

io.on('connection', socket=>{
  // 如果有client连接上了我，我就向 'client' 这个频道上发一条消息
  io.emit('client', '你已经连接上我了')
  // 监听 'server' 这个频道
  socket.on('server', msg=>{
    console.log('有客户端向我发消息了', msg)
    // 收到node api服务器发来的消息后，再转发给浏览器
    io.emit(msg.user_id, msg)
  })
})

httpServer.listen(8888, ()=>console.log('socket server in running on 8888'))
