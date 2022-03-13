const mongoose = require('mongoose')

module.exports =  mongoose.model('users', mongoose.Schema({
  username: String,
  password: String,
  create_time: { type: Number, default: Date.now() },
  role: String,
  role_name: String,
  status: { type: Number, default: 1 } 
}))
