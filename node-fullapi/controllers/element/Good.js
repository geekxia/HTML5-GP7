const goodModel = require('../../models/good')
const cateModel = require('../../models/cate')
const userModel = require('../../models/user')
const Message = require('./Message')

const socket = require('../../utils/socket')

class Good {
  static async goodList(ctx) {
    let { name, cate, page, size, hot, checked } = ctx.request.query
    // 做审核的用户
    const checkRoles = ['admin']
    const u = ctx.user
    // 对必填参数进行校验，如果有误，就结束传话并告知业务错误
    // 对非必填参数添加值
    page = parseInt(page || 1)
    size = parseInt(size || 10)
    // 默认前端已经传递所有的查询参数
    let params = {
      name: new RegExp(name, 'img'),
      cate,
      checked,
      status: { $gte: 0 },
      user_id: u._id
    }
    // 进一步处理那些前端没有传递的非必填参数
    if (!name) delete params.name
    if (!cate) delete params.cate
    if (checked===undefined) delete params.checked
    if (checkRoles.includes(u.role)) delete params.user_id
    try {
      // 一切准备到位，可以开始查询了
      const total = await goodModel.find(params).count()
      const list = await goodModel.find(params).limit(size).skip((page-1)*size).sort({create_time:-1})
      let newList = JSON.parse(JSON.stringify(list))
      // 得到商品列表后，再遍历list查询每个商品所对应商家信息
      for (let i=0; i<newList.length; i++) {
        const info = await userModel.findOne({_id: (newList[i].user_id)})
        newList[i]['shop_info'] = { shop_name: info.username, msg:'模拟商家信息' }
      }
      ctx.body = { err: 0, msg: 'success', data: {total,list:newList}}
    } catch (err) {
      console.log('----', err)
      ctx.body = {}
    }
  }

  // 编辑与新增
  static async goodAddOrEdit(ctx) {
    let { id, name, desc, price, img, cate, hot } = ctx.request.body
    const u = ctx.user
    // 有id是编辑，没有id是新增
    // 对所有的必填参数进行数据校验
    let ele = {
      name,
      desc,
      price,
      img,
      cate,
      user_id: u._id   // 把商品根据用户ID（商家ID）来做区分
    }
    if (id) {
      // 每次修改时，都要重新审核
      const info = await goodModel.updateOne({_id: id}, {$set: {...ele, checked:0,create_time:Date.now()}})
      ctx.body = { err: 0, msg: 'success', data: {info} }
    } else {
      const info = await goodModel.insertMany([ele])
      ctx.body = { err: 0, msg: 'success', data: {info} }
    }
  }

  // 获取所有品类
  static async getAllCate(ctx) {
    const list = await cateModel.find({})
    ctx.body = { err: 0, msg:'success', data: { list } }
  }

  // 描述：admin用户审核商品
  static async goodCheck(ctx) {
    // 谁修改的？审核消息？
    // 当前商品审核完成后，下一次需要审核是什么时候？
    let { id, checked } = ctx.request.query
    // 0 - 未审核  -1 = 已驳回  1 审核通过
    // 必填参数校验
    if (checked===undefined) checked = 0
    checked = Number(checked)
    console.log('id', id, 'checked', checked)
    try {
      const info = await goodModel.findOneAndUpdate({_id:id}, {$set:{checked}})
      console.log('---------', info)
      // 在这里，就是操作数据库已经成功，这个商品审核已完成。需求是要告诉shop用户
      const msg = {
        content: checked===1 ? '审核已通过' : '审核未通过',
        user_id: info.user_id,  // 模拟的是商家店铺
        good_id: info._id
      }
      await Message.addMessage(msg)
      console.log('msg', msg)
      // 审核完成时，向数据库表中存储一条消息
      socket.emit('server', msg)
      ctx.body = { err: 0, msg: 'success', data: {info}}
    } catch(err){
      console.log('err', err)
      ctx.body = { err: 1, msg: 'fail', data: {}}
    }
  }

  static async goodInfo(ctx) {
    let { id } = ctx.request.query
    // 校验id
    const info = await goodModel.findOne({_id: id})
    ctx.body = { err:0, msg:'success', data: {info}}
  }

  static async goodDelete(ctx) {
    let { id } = ctx.request.query
    // status 1-正常 0-下架 -1 删除
    const info = await goodModel.updateOne({_id:id}, {$set:{status:-1}})
    ctx.body = { err: 0, msg:'success', data:{info}}
  }
}

module.exports = Good
