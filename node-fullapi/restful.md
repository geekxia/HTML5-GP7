# 环境

- baseURL: 'http://localhost:9999'
- version: '/api/v1'
- methods: GET用于查询和删除  POST用于新增和编辑
- token：除登录接口外，其它业务接口都验证token。
- responese: { code:1, msg:'', data:{} }
- 验证规则：前端做必填字符验证、基本数据类型验证，后端完整验证。

# 一些常用的枚举字段

业务状态：code[-1=Token无效, 0-成功, 1-缺少必须字段, 2-数据类型错误]

# 集合（表）的设计

- 用户表、菜单表、角色表，参见react_models目录

# Admin系统（用户管理）

- 描述：登录接口，获取Token。
  - POST /login
  - params: {username:'',password:''}

- 描述：根据token获取用户信息
  - GET  /user/info
  - params: {}
  - headers: {Authorization:'token'}

- 描述：用户新增
  - POST /user/add
  - params: {username:'',role:'',role_name:'',id_card:'',mobile?:''}

- 描述：用户禁用与启用
  - GET /user/status
  - params: { user_id: '', status: 0 }  // 0-禁用 1-启用

- 描述：用户列表
  - GET /user/list
  - params: { username:'', page?:1, size?:10 }

# Admin系统（菜单管理）

- 描述：添加一个菜单模块或一个菜单
  - POST /menu/add
  - params: { module:0, pid?:'', path?:'', text:'', icon?:'', component?:'' }
  ```
  module: 0-菜单模块  1-一级菜单
  ```
- 描述：菜单（模块）列表
  - GET /menu/list
  - params: {page?:1, size?:10 }

# Admin系统（角色管理）

- 描述：角色列表
  - GET /role/list
  - params: {}

- 描述：添加（编辑）角色
  - POST /role/add
  - params: { role_name:'', role:'', role_desc:'', menus: '10;20;' }
  ```
  menus 是由‘菜单（模块）拼接而成的字符串’
  ```
- 描述：获取角色详情
  - GET /role/info
  - params: { role_id: '' }
