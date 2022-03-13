const mongoose = require('mongoose')

module.exports = mongoose.model('articles', new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    top: Boolean,
    author: String,
    create_time: { type: Number, default: Date.now() },
    status: { type: Number, default: 1 }
}))
