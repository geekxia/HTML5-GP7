import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store'

const Home = () => import('@/views/home/Home.vue')
const Detail = () => import('@/views/home/Detail.vue')

const Find = () => import('@/views/find/Find.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const User = () => import('@/views/user/User.vue')
const Login = () => import('@/views/user/Login.vue')
const Regist = () => import('@/views/user/Regist.vue')

const router = new VueRouter({
  // mode: 'hash',
  mode: 'history',
  routes: [
    { path: '/', components: { alive: Home } },
    { path: '/good/detail/:id', component: Detail },
    { path: '/find', component: Find },
    { path: '/cart', component: Cart, meta:{ isAuth:true }},
    { path: '/user', component: User, meta:{ isAuth:true } },
    { path: '/login', component: Login },
    { path: '/regist', component: Regist }
  ]
})

// 全局的导航守卫
// 功能：登录拦截、权限拦截
// to 你将要去的路由页面信息
// from 你当前正处在的路由页面信息
// next() 是否允许通过，但是，在导航守卫中无论任何一条逻辑线上有且仅能使用一次next()。
router.beforeEach((to,from,next)=>{
  console.log('to', to)
  console.log('from', from)
  const { isAuth } = to.meta
  // 假设的一个登录标识
  const userinfo = store.state.user.userinfo
  if (isAuth) {
    // 需要登录，才能过去
    if (userinfo._id) next()
    else location.href = '#/login'
    // else router.push('/login')
    // else next('/login')
  } else {
    next()
  }
})

// 三个局部路由守卫钩子
// beforeRouteEnter（这里不能访问this）
// beforeRouteUpdate
// beforeRouteLeave

export default router
