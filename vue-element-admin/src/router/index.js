import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* 引入布局组件 */
import Layout from '@/layout'
// import demoRoutes from './demoRoutes'

/**
 在路由规则上添加的一些自定义字段
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
  静态路由规则，所有用户都能访问的页面（没有权限的页面）
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页大屏', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 动态路由规则，要根据当前登录的用户角色进行配置（有权限的页面）
 */
export const asyncRoutes = [
  // 写我们公司自己的业务页面。。。
  {
    path: '/good',
    component: Layout,
    meta: { title: '商品管理', icon: 'el-icon-goods', roles: ['admin', 'editor', 'shop'] },
    children: [
      {
        path: 'list',
        component: ()=>import('@/views/good/good-list'),
        name: 'GoodList',
        meta: {
          title: '商品列表',
          icon: 'el-icon-sugar',
          noCache: false,
          roles: ['admin', 'editor', 'shop']
        }
      },
      {
        path: 'add',
        component: ()=>import('@/views/good/good-form'),
        hidden: true,
        name: 'GoodAdd',
        meta: {
          icon: 'el-icon-sugar',
          noCache: false,
          roles: ['editor', 'shop']
        }
      },
      {
        path: 'edit/:id',
        component: ()=>import('@/views/good/good-form'),
        hidden: true,
        name: 'GoodEdit',
        meta: {
          title: '商品编辑',
          icon: 'el-icon-sugar',
          noCache: false,
          roles: ['editor','shop']
        }
      },
      {
        path: 'cate',
        component: ()=>import('@/views/good/cate-manage'),
        name: 'CateManage',
        meta: {
          title: '品类管理',
          icon: 'el-icon-food',
          noCache: false,
          roles: ['editor', 'shop']
        }
      },
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'el-icon-goods', roles:['admin'] },
    children: [
      {
        path: 'user',
        component: ()=>import('@/views/system/user-manage'),
        name: 'UserManage',
        meta: { title: '用户管理', icon: 'el-icon-sugar', noCache: false }
      },
      {
        path: 'user2',
        component: ()=>import('@/views/system/user-manage'),
        name: 'GoodAdd',
        meta: { title: '占位页面', icon: 'el-icon-sugar', noCache: false }
      },
    ]
  },

  // ...demoRoutes,
  // 重定向规则必须放在最一条
  { path: '*', redirect: '/404', hidden: true }
]

// 封装“创建router”的方法
function createRouter() {
  return new Router({
    mode: 'hash',
    // 路由规则，在这里只考虑了静态路由规则
    // 思考：那么那些动态路由规则是如何起作用的？（路由守卫）
    routes: constantRoutes,
    scrollBehavior: () => ({ y: 0 })
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 在什么情况下需要重置所有的路由规则？当用户角色发生变化时。
export function resetRouter() {
  // 创建一个新的router，进行路由规则重置
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 为什么路由守卫的代码没有写在这里？
// 因为它太重要，所以封装到src根目录里 permission.js。

export default router
