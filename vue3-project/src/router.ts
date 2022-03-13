import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('@/pages/study/Home.vue')
const Find = () => import('@/pages/study/Find.vue')
const Detail = () => import('@/pages/detail/index.vue')

const Cnode = () => import('@/pages/cnode/index.vue')

export default createRouter({
  history: createWebHashHistory(), // hash路由
  routes: [
    { path: '/', component: Home, meta: { transition: 'fade', isAlive: true } },
    { path: '/find', component: Find },
    { path: '/cnode', component: Cnode },
    { path: '/detail', component: Detail }
  ]
})
