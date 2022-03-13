const mongoose = require('mongoose')

module.exports =  mongoose.model('goods', mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  price: Number,
  cate: String,
  hot: { type: Boolean, default: false },
  rank: { type: Number, default: 0 },
  create_time: { type: Number, default: Date.now() },
  // 1 正常上架  0 下架了  -1 已删除
  status: { type: Number, default: 1 },
  // 1 审核通过，0-未审核  -1已驳回。每次商家修改商品时，都要再次将变成 0 的状态。
  checked: { type: Number, default: 0 },
  // 根据商家店铺来区分商品，这里用用户id来模拟
  user_id: String
}))
