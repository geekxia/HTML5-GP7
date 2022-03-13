import router from './router'
import store from './store'

// 从element-ui中导入交互提示的组件
import { Message } from 'element-ui'

// 进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// Utils中的工具方法
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// 进度条的自定义配置
NProgress.configure({ showSpinner: false })

// 白名单 no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

// 全局导航守卫，path和component准备配对
router.beforeEach(async(to, from, next) => {
  // 打开进度条
  NProgress.start()
  // 动态设置title
  document.title = getPageTitle(to.meta.title)

  // 是否有token？（如果有token是token字符串）
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果token存在，当你访问/login时，重定向系统内页path='/'，也就是说没有必要再访问login。
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如果token存在，当访问非/login时，确保当前用户可访问的动态路由规则是正常的。

      // 判断vuex中是否有当前用户的“角色信息”，返回布尔值
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        // 如果在vuex中有用户的“角色信息”，直接通过。
        // 思考：如果在vuex中已经有了当前“用户信息”，这说明了什么？这说明了根据用户角色所生成的动态路由已经是生效的。
        next()
      } else {
        // 如果token存在（无论token是真还是假），并且在vuex中没有当前用户的“角色信息”时，走流程获取用户信息，再根据用户角色信息生成路由规则。

        // 思考：下面这段try...catch在哪些情况下会执行？（登录流程、刷新流程）
        try {
          console.log('----------------------------------------')
          // 准备开始 用token获取用户信息
          // 温馨提示：roles 的数据格式 ['admin','developer','editor']

          // 既然现在没用户信息，我就触发user这个store走流程去获取用户信息
          const { roles } = await store.dispatch('user/getInfo')
          // 在这里，已经拿到了roles（用户的角色信息）

          console.log('---roles', roles)

          // generate accessible routes map based on roles
          // 根据roles（用户的角色信息）生成当前用户可访问的路由规则

          // 触发并调用permission这个store中方法，生成当前用户可以访问的路由规则（数组）
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 在这里，手动地把当前用户可以访问的路由规则添加到router的路由规则。
          router.addRoutes(accessRoutes)

          // 到目前为止，vuex中已经有用户信息了，并且动态路由规则也手动添加到router中去。
          // 现在，你可过去了。
          next({ ...to, replace: true })
        } catch (error) {
          // 如果有任何异常发生，重置vuex中的token，接着重定向到/login登录页。
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果token不存在，并且将要访问的页面在白名单中，直接可以访问。
      next()
    } else {
      // 如果token不存在，并且将要访问的页面不在白名单中，重定向到/login页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 全局导航守卫，path和component配对成功时，关闭进度条
router.afterEach(() => {
  NProgress.done()
})
