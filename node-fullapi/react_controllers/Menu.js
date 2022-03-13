const menuModel = require('../react_models/menu')

class Menu {
  static async addMenu(ctx) {
    console.log('----')
    const { module, pid, path, text, icon, component } = ctx.request.body
    // 【第一重验证】
    // 如果module=0, pid、path、component不要
    // 如果module=1, pid、path、component必须要有，icon可以没有

    // 【第二重验证】
    // path 是不能重复（单页面应用）
    if (path) {
      const info = await menuModel.findOne({path})
      if (info && info._id) {
        return ctx.body = {code:4,msg:'路由path不能重复',data:{}}
      }
    }
    const ele = {
      module: Number(module),
      pid: (pid || ''),
      path: (path || ''),
      text: (text || ''),
      icon: (icon || ''),
      component: (component || '')
    }
    await menuModel.insertMany([ele])
    ctx.body = {code:0,msg:'success',data:{}}
  }

  static async listMenu(ctx) {
    let { page, size } = ctx.request.query
    page = Number(page || 1)
    size = Number(size || 10)
    // 这个分页（逻辑比较复杂）暂时不写
    const list = await menuModel.find({})
    ctx.body = {code:0,msg:'success',data:{list}}
  }
}

module.exports = Menu
