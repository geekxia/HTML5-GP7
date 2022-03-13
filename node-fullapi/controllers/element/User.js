const userModel = require('../../models/user')
const roleModel = require('../../models/role')
const Message = require('./Message')
const jwt = require('../../utils/jwt')

class User {
  // 添加用户（用户。。。）
  static async addUser(ctx) {
    let { username, role, role_name } = ctx.request.body
    // 各种字段的校验
    // 查询是否用户名已被占用
    const user = await userModel.findOne({username})
    if (user) username+=2
    let ele = {
      username,
      password: '123456',
      role,
      role_name
    }
    const info = await userModel.insertMany([ele])
    ctx.body = { err: 0, msg: 'success', data: {username} }
  }

  // 登录接口
  static async login(ctx) {
    let { username, password } = ctx.request.body
    const user = await userModel.findOne({username, password})
    if (user && user.status !== 1) {
      ctx.body = { err: -2, msg: '用户账号异常，请联系管理员', data: { }}
      return
    }
    if(user) {
      // 生成token
      const token = jwt.creataToken(user)
      ctx.body = { err: 0, msg: '登录成功', data: { token }}
    }else{
      ctx.body = { err: 1, msg: '用户名和密码不匹配', data: {}}
    }
  }

  // 用户信息接口:前端传token过来,后端验证成功返回完整的用户信息.
  static async getUserInfo(ctx) {
	  const u = ctx.user
    // 查询完整的用户信息（roles）
	  const userinfo = await userModel.findOne({_id: u._id})
    let roles = []
    if (userinfo.role) {
      console.log('---role handle start')
      roles = userinfo.role.split(';').filter(ele=>ele)
    }
    console.log('roles', roles)
    const message_list = await Message.getUserMessage(u._id)
	  ctx.body = {
      err: 0, msg: 'success',
      data: {
        userinfo: {
          _id: userinfo._id,
          name: userinfo.name,
          roles,
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          introduction: '高薪就业'
        },
        message_list
      }
    }
  }

  static async getUserList(ctx) {
    let { status, page, size, role, name } = ctx.request.query
    page = parseInt(page || 1)
    size = parseInt(size || 10)
    let params = {
      status: Number((status || -1)),
      role
    }
    if (params.status===-1) delete params.status
    if (!params.role) {
      // 查询带有role这个字段的用户
      params.role = { $exists: true }
    }
    if(name) params.username = new RegExp(name, 'img')
    const total = await userModel.find(params).count()
    const list = await userModel.find(params).skip((page-1)*size).limit(size)
    ctx.body = {err:0, msg:'success', data: {list,total}}
  }

  static async updateUser(ctx) {
    let { id, status } = ctx.request.query
    // 要求前端一定要传status
    status = Number(status)
    const info = await userModel.updateOne({_id:id}, {$set:{status}})
    ctx.body = { err: 0, msg: 'success', data: { info } }
  }

  static async getRoleList(ctx) {
    const list = await roleModel.find({})
    ctx.body = { err: 0, msg: 'success', data: { list }}
  }
}

module.exports = User
