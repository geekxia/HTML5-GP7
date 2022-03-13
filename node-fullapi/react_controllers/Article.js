const articleModel = require('../react_models/article')

class Article {
  static async addArticle(ctx) {
    const { title, author, top, image, content, id } = ctx.request.body
    const ele = {
      title,
      author,
      top,
      image,
      content
    }
    if (id) {
      const info = await articleModel.updateOne({_id:id}, {$set:ele})
      ctx.body = { code: 0, msg:'success', data: {info}}
    } else {
      const info = await articleModel.insertMany([ele])
      ctx.body = { code: 0, msg:'success', data: {info}}
    }

  }

  static async listArticle(ctx) {
    let { page, size, title } = ctx.request.query
    page = Number(page || 1)
    size = Number(size || 10)
    let params = {
      title: new RegExp(title, 'img')
    }
    if (!title) delete params.title
    const total = await articleModel.find(params).count()
    const list = await articleModel.find(params).skip((page-1)*size).limit(size).sort({_id:-1})
    ctx.body = {code:0,msg:'success',data:{list,total}}
  }

  static async infoArticle(ctx) {
    let { id } = ctx.request.query
    const info = await articleModel.findOne({_id:id})
    ctx.body = { code: 0, msg:'success', data: {info}}
  }
}

module.exports = Article
