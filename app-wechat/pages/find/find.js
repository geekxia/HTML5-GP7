// pages/find/find.js
const qfData = require('./qf.js')
const { initRange } = require('../../utils/util')
console.log('qfData', qfData)



console.log('initRange', initRange(qfData,1,3))


Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { id: 1, name: 'zhang sang', age: 10 },
            { id: 2, name: 'li si', age: 20 },
            { id: 3, name: 'wang wu', age: 30 }
        ],
        idx: 1,
        name: 'GP7',
        cates: [
          { id: 1, label:'推荐1', value: 'a' },
          { id: 2, label:'推荐2', value: 'a' },
          { id: 3, label:'推荐3', value: 'a' },
          { id: 4, label:'推荐4', value: 'a' },
          { id: 5, label:'推荐5', value: 'a' },
          { id: 6, label:'推荐6', value: 'a' },
          { id: 7, label:'推荐7', value: 'a' },
          { id: 8, label:'推荐8', value: 'a' },
          { id: 9, label:'推荐9', value: 'a' },
          { id: 10, label:'推荐10', value: 'a' },
          { id: 11, label:'推荐11', value: 'a' },
          { id: 12, label:'推荐12', value: 'a' },
          { id: 19, label:'推荐13', value: 'a' },
          { id: 100, label:'推荐14', value: 'a' }
        ],
        curId: 1,
        region: [],
        qfRange: initRange(qfData,1,3)
    },

    qfChange(ev) {
      // console.log('qf picker change', ev.detail.value)
    },
    qfColChange(ev) {
      console.log('qf picker col change', ev.detail)
      const { column, value } = ev.detail
      const { firstId, twoId, range } = this.data.qfRange
      if (column===0) {
        // 这说明变的是第一列
        // 所以第二列要变
        // 因为第二列变了，所以第三列也要更新
        const result = initRange(qfData, range[0][value].id, twoId)
        this.setData({qfRange: result})
      } else if (column===1) {
        // 这说明变的是第二列
        // 只用更新第三列
        console.log('twoId', range[1][value].id)
        const result = initRange(qfData, firstId, range[1][value].id)
        this.setData({qfRange: result})
      }
    },

    cateTap(ev) {
      console.log('ev', ev.target.dataset)
      const { index } = ev.target.dataset
      this.setData({curId: index})
    },

    innerTap() {
        console.log('---inner')
    },
    outerTap() {
        console.log('---outer')
    },

    userTap(ev) {
        console.log('ev', ev.target.dataset)
    },

    nameChange(ev) {
        console.log('ev', ev)
        this.setData({name: ev.detail.value})
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const $ = wx.createSelectorQuery()
        $.select('#test').boundingClientRect(res=>{
            console.log('dom', res)
        })
    },

    start1() {
        // 开始动画
        this.animate('.abc', [
            { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
            { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00'},
            { opacity: 0.1, rotate: 75, backgroundColor: '#FF0000' },
            ], 5000, function () {
                // 动画结束时
              this.clearAnimation('.abc', { opacity:true, backgroundColor:true }, function () {
                console.log("清除了#container上的opacity和rotate属性")
              })
          }.bind(this))
    },

    start2() {
        console.log('---')
        // 开始动画
        this.animate('.door', [
            { width: '750rpx', opacity: 1.0, backgroundColor: '#FF0000' },
            { width: '300rpx', opacity: 0.5,  backgroundColor: '#00FF00'},
            { width: '1rpx', opacity: 0.1, backgroundColor: '#FF0000' },
            ], 5000, function () {
                // 动画结束时
              this.clearAnimation('.door', { opacity:true, backgroundColor:true }, function () {
                console.log("清除了#container上的opacity和rotate属性")
              })
          }.bind(this))
    },

    getInfo() {
      wx.getUserProfile({
        desc: '希望访问你的头像、昵称',
        success(res) {
          console.log('用户信息', res)
        },
        fail(err) {
          console.log('用户信息失败', err)
        }
      })
    },

    getAvatar(res) {
      console.log('用户头像', res)
    },

    getRegion(ev) {
      console.log('ev region', ev)
      const arr = [...(new Set(ev.detail.value))]
      console.log('arr', arr)
      this.setData({region: arr})
    }

})
