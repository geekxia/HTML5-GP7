import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 注册插件

// 路由懒加载的语法基础：动态导入技术，Webpack代码分割。
const Home = ()=>import('@/views/home/Home.vue')

const HomeFollow = ()=>import('@/views/home/components/Follow.vue')
const HomeHot = ()=>import('@/views/home/components/Hot.vue')
const HomeRecommend = ()=>import('@/views/home/components/Recommend.vue')
const HomeVideo = ()=>import('@/views/home/components/Video.vue')
const HotDetail = ()=>import('@/views/home/HotDetail.vue')

const Vip = ()=>import('@/views/vip/Vip.vue')

// 自定义
const routes = [
  {
    // 人话：当url='/'时，路由系统要找到一个名字叫alive的<router-view>来显示Home组件。
    id: 1, path: '/', components: { alive: Home }, text: '首页', name: 'home',
    // 这个children叫做“嵌套路由”
    children: [
      { id: 101, text:'关注', path: '/follow', component: HomeFollow, meta: { page: '/' } },
      { id: 102, text:'推荐', path: '/', component: HomeRecommend, meta: { page: '/' } },
      { id: 103, text:'热榜', path: '/hot', component: HomeHot, meta: { page: '/' } },
      { id: 104, text:'视频', path: '/video', component: HomeVideo, meta: { page: '/' } }
    ]
  },
  // 人话：当url='/vip'时，路由系统要找到一个叫default的<router-view>来显示Vip组件。
  { id: 2, path: '/vip', alias:'/v', component: Vip, text: '会员', name: 'vip' },
  // props: true, 开启props传参
  { id: 3, path: '/hot/:id', component: HotDetail, text:'详情页', hidden:true, props: true }
]
export { routes }

// 生成new VueRouter所需要的路由规则
const createRoutes = () => {
  // do something
  return routes
}

export default new VueRouter({
  mode: 'hash', // 'history'
  // 自定义路由规则，如何理解路由规则？所谓的路由规则，当你访问某个url时，路由系统就加载指定的组件进行显示。
  routes: [
    ...createRoutes(),
    // 重定向，一般放在路由规则的最后一条，并且重定向到一个已定义过的规则。
    { path: '/*', redirect: '/404' }
  ]
})
