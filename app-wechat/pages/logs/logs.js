// logs.js
const util = require('../../utils/util.js')
const api = require('../../utils/request.js')

Page({
  data: {
    list: [],
    page: 1
  },
  getMsg(ev) {
    console.log('+++')
    console.log('来自button子组件回传的数据', ev)
  },
  onLoad() { this.init() },
  init() {
    const params = {
      limit: 10,
      page: this.data.page
    }
    api.requestArticle(params).then(list=>{
      console.log('文章列表', list)
      this.setData({list: [...this.data.list, ...list]})
      wx.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    console.log('到底了，准备调接口')
    const { page } = this.data
    this.setData({page:page+1})
    this.init()
  },
  onPullDownRefresh() {
    this.setData({list:[],page:1})
    this.init()
  },
  skipToDetail(ev) {
    const { id } = ev.target.dataset
    console.log('id', id)
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }
})
