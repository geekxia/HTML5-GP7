const mongoose = require('mongoose')

module.exports =  mongoose.model('messages', mongoose.Schema({
  user_id: String,
  content: String,
  type: { type: String, default: 'good' },
  read: { type: Boolean, default: false },
  create_time: { type: Number, default: Date.now() }
}))
