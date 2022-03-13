const mongoose = require('mongoose')

module.exports =  mongoose.model('carts', mongoose.Schema({
  user_id: String,
  good_id: String,
  num: Number,
  create_time: { type: Number, default: Date.now() },
  status: { type: Number, default: 1 }
}))