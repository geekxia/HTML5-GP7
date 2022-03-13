const cartModel = require('../../models/cart')
const goodModel = require('../../models/good')

class CartController {
  // 添加购物车（需要鉴权）
  static async addToCart(ctx) {
    let { good_id, num } = ctx.request.body
    // 参数验证
    // console.log('user  ---- ', ctx.user)
    const u = ctx.user
    // 谁买的？希望每个C端用户在买商品都带上token
    // 反解析token就知道用户是谁了。
    // 数据库的插入操作
    const ele = {
      user_id: u._id,
      good_id,
      num: num || 1
    }
    // console.log('ele', ele)
    const doc = await cartModel.findOne({user_id: u._id, good_id, status: 1})
    if(doc) {
      // 如果当前商品已经被当前用户添加过了，数量加1
      await cartModel.updateOne({user_id: u._id, good_id}, { num: doc.num + num })
    } else {
      await cartModel.insertMany([ele])
    }
    ctx.body = { err: 0, msg: 'success', data: {info: ele}}
  }

  // 获取购物车列表
  static async getCartList(ctx) {
    const u = ctx.user
    let list = await cartModel.find({status: 1, user_id: u._id})
    // model查询的数据不能直接改
    let newList = JSON.parse(JSON.stringify(list))
    // let count = 0
    // 你试下forEach
    for(let i=0; i<newList.length; i++) {
      newList[i]['good_info'] = await goodModel.findOne({_id: newList[i].good_id})
    }
    ctx.body = { err: 0, msg: 'success', data: {list: newList} }
  }

  static async delCartItem(ctx) {
    let { cart_id } = ctx.request.query
    await cartModel.updateOne({_id: cart_id}, { status: 0 })
    ctx.body = { err: 0, msg: 'success', data: {} }
  }

  static async updCartCount(ctx) {
    let { cart_id, new_num } = ctx.request.query
    await cartModel.updateOne({_id: cart_id}, {num: new_num})
    ctx.body = { err: 0, msg: 'success', data: {} }
  }

  static async submitCart(ctx) {
    let { ids } = ctx.request.body
    const arr = ids.split(';').filter(ele=>ele)
    for(let i=0; i<arr.length; i++) {
      await cartModel.updateOne({_id: arr[i]}, { status: 0 })
    }
    // 生成一张订单
    ctx.body = { err: 0, msg: 'success', data: {} }
  }
}

module.exports = CartController