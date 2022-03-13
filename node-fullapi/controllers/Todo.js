const todoModel = require('../models/todo')

class TodoController {

  // 描述：获取任务列表
  static async getTodoList(ctx) {
    // 如果是GET请求，像下面这样获取入参
    // const query = ctx.request.query
    const list = await todoModel.find({status:1})
    const undone = list.filter(ele=>ele.done===1)
    const done = list.filter(ele=>ele.done===0)
    ctx.body = {
      code: 1,
      msg: 'success',
      data: { undone, done }
    }
  }
  static async addTodo(ctx) {
    // 如果是POST请求，像下面这样获取入参
    const { task } = ctx.request.body
    const ele = { task }
    const info = await todoModel.insertMany([ele])
    ctx.body = {
      code: 1,
      msg: 'success',
      data: { info }
    }
  }
  static async delTodo(ctx) {
    const { id } = ctx.request.query
    // 验证id的必填
    const info = await todoModel.updateOne({_id:id}, {$set: {status:-1}})
    ctx.body = {
      code: 1,
      msg: 'success',
      data: { info }
    }
  }
  static async transferTodo(ctx) {
    const { id, done } = ctx.request.query
    const info = await todoModel.updateOne({_id: id}, {$set:{done: (Number(done)+1)%2}})
    ctx.body = {
      code: 1,
      msg: 'success',
      data: { info }
    }
  }
  static async updTodo(ctx) {
    const { id, new_task } = ctx.request.body
    const info = await todoModel.updateOne({_id: id}, {$set:{task: new_task}})
    ctx.body = {
      code: 1,
      msg: 'success',
      data: { info }
    }
  }
}

module.exports = TodoController
