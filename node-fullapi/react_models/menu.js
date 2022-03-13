const mongoose = require('mongoose')

module.exports = mongoose.model('menus', new mongoose.Schema({
  module: Number,
  path: String,
  text: String,
  icon: String,
  component: String,
  pid: String
}))
