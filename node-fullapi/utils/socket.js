const { io } = require("socket.io-client")

// 连接8888这个端口的websocket服务
const socket = io('ws://localhost:8888')
socket.on('client', msg=>{
  console.log('node api 服务器 连接 socket 服务器 连接上了', msg)
})

module.exports = socket
