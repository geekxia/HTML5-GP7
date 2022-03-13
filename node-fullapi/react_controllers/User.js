const userModel = require('../react_models/user')
const roleModel = require('../react_models/role')
const menuModel = require('../react_models/menu')
const jwt = require('../utils/jwt')

class User {
  static async login(ctx) {
    let { username, password } = ctx.request.body
    // 验证数据
    const info = await userModel.findOne({username,password})
    console.log('info', info)
    // 如果用户的status=0，用户是禁用状态的，不能登录
    if (info && info.status==0) {
      return ctx.body = { code:4, msg:'用户状态异常，请联系管理员',data:{}}
    }
    if (info && info._id) {
      const token = jwt.creataToken(info)
      ctx.body = { code:0,msg:'success',data:{token}}
    } else {
      ctx.body = { code:3,msg:'用户名和密码不匹配',data:{}}
    }
  }

  static async getUserInfo(ctx) {
    const user = ctx.user
    console.log('user', user)
    const userInfo = await userModel.findOne({_id:user._id})
    // 查询非admin用户的角色信息
    let roleInfo = await roleModel.findOne({role:userInfo.role})

  	let menuArr = []
  	if (roleInfo?.role==='test') {
      // 如果是非test用户，要根据roleInfo.menus字段来返回相应的菜单列表
  	  menuArr = await menuModel.find({})
  	} else {
      // 非test用户，要根据用户的role->menus->menuArr
      // 未完成，你自己做
    }
    ctx.body = { code:0, msg:'success',data:{userInfo, roleInfo, menuArr }}
  }

  static async addUser(ctx) {
    let { username, role, role_name, id_card, mobile } = ctx.request.body
    // 参数验证

    // 验证用户不重复
    const info = await userModel.findOne({username})
    if (info && info._id) ctx.body = {code:3,msg:'当前用户名已被占用',data:{}}
    const ele = {
      username,
      // 取身份证
      password: id_card.slice(-6),
      role,
      role_name,
      id_card,
      mobile: mobile || ''
    }
    await userModel.insertMany([ele])
    ctx.body = {code:0,msg:'success',data:{}}
  }

  static async updUser(ctx) {
    const { user_id, status } = ctx.request.query
    // 数据校验
    await userModel.updateOne({_id:user_id}, {$set:{status:Number(status)}})
    ctx.body = {code:0,msg:'success',data:{}}
  }

  static async listUser(ctx) {
    let { username, page, size } = ctx.request.query
    const params = {
      username: new RegExp(username, 'img')
    }
    page = Number(page || 1)
    size = Number(size || 10)
    // 如果前端没有给username字符，或者给的空串，那么username不参与查询
    if (!username) delete params.username
    const total = await userModel.find(params).count()
    const list = await userModel.find(params).skip((page-1)*size).limit(size).sort({_id:-1})
    ctx.body = {code:0,msg:'success',data:{total,list}}
  }
}

module.exports = User
