const mongoose = require('mongoose')

module.exports = mongoose.model('roles', new mongoose.Schema({
  role: String,
  role_name: String,
  role_desc: String,
  menus: String
}))
