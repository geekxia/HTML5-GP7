const messageModel = require('../../models/message')

class Message {
  static addMessage(ele) {
    // const ele =
    return messageModel.insertMany([ele])
  }

  static getUserMessage(user_id) {
    return messageModel.find({user_id, read: false})
  }
}

module.exports = Message
