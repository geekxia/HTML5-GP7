import loadable from '@loadable/component'

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreOutlined
} from '@ant-design/icons'

const UserManage = loadable(()=>import('./user/UserManage'))
const MenuManage = loadable(()=>import('./menu/MenuManage'))
const RoleManage = loadable(()=>import('./menu/RoleManage'))
const RoleForm = loadable(()=>import('./menu/RoleForm'))

export default [
  {
    id: 10,
    text: '员工之家',
    icon: <UserOutlined />,
    children: [
      {
        id: 1001,
        text: '用户管理',
        path: '/user/list',
        component: UserManage
      }
    ]
  },
  {
    id: 11,
    text: '权限管理',
    icon: <AppstoreOutlined />,
    children: [
      {
        id: 1101,
        text: '菜单管理',
        path: '/menu/manage',
        component: MenuManage
      },
      {
        id: 1102,
        text: '角色管理',
        path: '/role/manage',
        component: RoleManage,
        children: [
          {
            id: 1103,
            text: '新增角色',
            path: '/role/create',
            component: RoleForm
          },
          {
            id: 1104,
            text: '编辑角色',
            path: '/role/edit/:id',
            component: RoleForm
          }
        ]
      }
    ]
  }
]
