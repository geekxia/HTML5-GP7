const goodModel = require('../../models/good')
const cateModel = require('../../models/cate')

class GoodController {
  static async getGoodList(ctx) {
  	// let { hot, cate, name, min_price, max_price } = ctx.request.query
    let { page, size, cate } = ctx.request.query
  	size = parseInt(size || 10)
  	page = parseInt(page || 1)
  	// 查询条件
  	const params = {
      cate,
      checked: 1,  // 审核通过的
      status: 1    // 正常上架的
    }
  	if (!params.cate) delete params.cate
  	const total = await goodModel.find(params).count()
  	const list = await goodModel.find(params).limit(size).skip((page-1)*size).sort({create_time: -1})
  	ctx.body = { err: 0, msg:'success' ,data: {total, list}}
  }

  static async getAllCates(ctx) {
	  let list = await cateModel.find({})
	  ctx.body = { err:0, msg:'success', data: {list} }
  }

  static async getGoodInfo(ctx) {
	  let { id } = ctx.request.query
	  if(!id) return ctx.body = { err: 1, msg:'id是必填入参', data: {} }
	  const info = await goodModel.findOne({_id: id})
	  // 商家信息查询
	  // 商品评论查询
	  ctx.body = { err: 0, msg: 'success', data: { info }}
  }
}

module.exports = GoodController
