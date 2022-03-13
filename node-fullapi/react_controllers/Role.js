const roleModel = require('../react_models/role')

class Role {
  static async addOrEditRole(ctx) {
    let { role, role_name, role_desc, menus, role_id } = ctx.request.body
    // 参数校验
    const ele = {
      role, role_name, role_desc, menus
    }
    if (role_id) {
      await roleModel.updateOne({_id:role_id}, {$set:ele})
    } else {
      await roleModel.insertMany([ele])
    }
    ctx.body = {code:0,msg:'success',data:{}}
  }

  static async listRole(ctx) {
    const list = await roleModel.find({})
    ctx.body = {code:0,msg:'success',data:{list}}
  }

  static async infoRole(ctx) {
    const { role_id } = ctx.request.query
    // 必须有role_id
    let info = await roleModel.findOne({_id:role_id})
    ctx.body = {code:0,msg:'success',data:{info}}
  }
}

module.exports = Role
