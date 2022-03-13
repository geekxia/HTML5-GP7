const mongoose = require('mongoose')

module.exports = mongoose.model('users', new mongoose.Schema({
  username:String,
  password:String,
  status:{type:Number,default:1},
  role:String,
  role_name:String,
  avatar:String,
  introduce:String,
  create_time: {type:Number,default:Date.now()},
  id_card: String,
  mobile: String,
  modify_time: {type:Number,default:0}
}))
