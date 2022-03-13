import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import {
  Button,
  Tabbar,
  TabbarItem,
  NoticeBar,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  List,
  PullRefresh,
  NavBar,
  Sidebar,
  SidebarItem,
  SubmitBar,
  Checkbox,
  SwipeCell,
  Card,
  Col,
  Row,
  Cell,
  CellGroup,
  Tag,
  Icon,
  Form,
  Field,
  Toast,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Dialog
} from 'vant'
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NoticeBar)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(NavBar)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Dialog)

// 原型链上尽量少放东西
import img from '@/utils/img'
Vue.prototype.$img = img
import api from '@/api'
Vue.prototype.$api = api

import store from '@/store'
import router from '@/router'

// <button v-auth>加入购物车</button>

Vue.directive('auth', function(el){
  const userinfo = store.state.user.userinfo
  if (!userinfo || !userinfo._id) {
    el.style.position = 'relative'
    const oDiv = document.createElement('div')
    oDiv.style.position = 'absolute'
    oDiv.style.top = 0
    oDiv.style.bottom = 0
    oDiv.style.left = 0
    oDiv.style.right = 0
    oDiv.style.zIndex = 9999
    oDiv.style.background = 'black'
    oDiv.addEventListener('click', function(){
      router.push('/login')
    })
    el.appendChild(oDiv)
  }
})

Vue.directive('scroll', function(el){
  el.style.position = 'absolute'
  el.style.top = 0
  el.style.bottom = 0
  el.style.left = 0
  el.style.right = 0
  el.style.overflow = 'scroll'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
