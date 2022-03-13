const mongoose = require('mongoose')

module.exports =  mongoose.model('roles', mongoose.Schema({
  create_time: { type: Number, default: Date.now() },
  role: String,
  role_name: String,
  navs: { type: String, default: '' }
}))
