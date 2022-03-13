// index.js
// 获取应用实例
const app = getApp()
console.log('小程序中唯一的顶层对象', app)
const { calDis, search } = require('../../utils/util')

// 注册页面（页面组件，要配置在路由中的）
Page({
  data: {
    motto: 'Hello World',
    show: true,
    latLng: {},
    shopList: [
      { id: '奈雪的茶-1', logo: '', latitude: 39.984060, longitude: 116.307520 },
      { id: '奈雪的茶-2', logo: '', latitude: 39.985060, longitude: 116.317520 },
      { id: '奈雪的茶-3', logo: '', latitude: 39.994060, longitude: 116.327520 },
      { id: '奈雪的茶-4', logo: '', latitude: 40.984060, longitude: 117.307520 }
    ],
    markers: []
  },
  onShow() {
    wx.getSetting({
      success: (res) => {
        this.setData({show: res.authSetting['scope.userLocation']})
      }
    });
    // 监听用户的位置变化
    wx.onLocationChange(function(res){
      console.log('实时的当前位置', res)
    });
  },
  openLogin() {
    wx.openSetting({
      success(res) {
        console.log('用户手动授权了', res)
      },
      fail(err) {
        console.log('用户手动，未授权', err)
      }
    })
  },

  rpx2px(rpx) {
    // 当前手机的真实宽度（px）
    const width = wx.getSystemInfoSync().windowWidth
    return width*rpx/750

    // 使用等比缩放实现canvas在不同手机的样式兼容性
    // const dpr = wx.getSystemInfoSync().pixelRatio
    // canvas.width = res[0].width * dpr
    // canvas.height = res[0].height * dpr
    // ctx.scale(dpr, dpr)
  },
  // 用于支持最新drawImage()写法
  async getImage(path) {
      const c = wx.createOffscreenCanvas({type: '2d'})
      const image = c.createImage()
      await new Promise(resolve => {
        image.onload = resolve
        image.src = path
      })
      return image
  },

  draw() {
    // 注意：canvas在绘制时，只能使用px做单位
    const $ = wx.createSelectorQuery()
    $.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        // 第一步，拿到canvas画布的DOM对象
        const canvas = res[0].node._canvasRef
        // 第二步，使用dom对象获取画布上下文
        const ctx = canvas.getContext('2d')
        // 样式的处理
        canvas.width = parseInt(canvas.style.width)
        canvas.height = parseInt(canvas.style.height)
        canvas.style.width = ''
        canvas.style.height = ''

        this.canvas = res[0].node
        // 绘制背景色
        ctx.fillStyle = 'orange'
        ctx.fillRect(0,0,this.rpx2px(750),this.rpx2px(1000))

        // 设置画笔的字体
        ctx.font = 'bold 18px serif'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText('千锋欢迎你', this.rpx2px(375), 30)
        // 设置画笔的样式
        ctx.lineWidth = 4
        ctx.strokeStyle = 'blue'
        ctx.strokeRect(this.rpx2px(375/2), 50, this.rpx2px(375), this.rpx2px(375))
        // // 画一张我的图像（canvas不支持异步的图片）
        const that = this
        wx.getUserInfo({
          success(res){
            console.log('用户信息', res.userInfo.avatarUrl)
            const url = res.userInfo.avatarUrl
            that.getImage(url).then(image=>{
              ctx.drawImage(image, that.rpx2px(275), 100, that.rpx2px(200), that.rpx2px(200))
            })
          }
        })
      })
  },

  onReady () {
    app.globalData.userInfo = { name:'张三' }
    this.draw()
    if (!this.show) {
      const that = this
      wx.getLocation({
        success(pos) {
          console.log('当前位置', pos)
          that.setData({latLng: pos })
          // 测试距离计算
          calDis(pos,that.data.shopList).then(list=>{
            console.log('带有距离的店铺列表', list)
          })
        },
        fail(err) {
          console.log('位置失败', err)
        }
      })
    }



  },
  // 保存到相同
  save() {
    // 把canvas画布转换成临时路径
    wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: this.rpx2px(750),
        height: this.rpx2px(750),
        destWidth: 1000,
        destHeight: 1000,
        canvas: this.canvas,
        success(res) {
          // 把临时路径中的图片保存到相册
          wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath
          })
        }
    })
  },
  // 咨询（打电话）
  call() {
    wx.makePhoneCall({
      phoneNumber: '0755-99998888'
    })
  },
  // 通过微信内置地图，实现导航功能
  navigate() {
    const { latLng } = this.data
    wx.openLocation({
      latitude: latLng.latitude,
      longitude: latLng.longitude,
      name: '千锋教育',
      address: '深圳西部硅谷BC一楼'
    })
  },
  // 获取手机
  getMobile(res) {
    console.log('手机信息', res)
    // 拿到手机信息（加密的密文）
    // request调接口，发给后端
    // 后端再使用appid、appserect进行解密
  },
  onShareAppMessage(res) {
    console.log('分享', res)
    if (res.from === 'button') {
      // 如果用户点击的是拼团进行分享，分享的“拼团页面”。
      return {
        title: '还差1人成团',
        imageUrl: 'https://img10.360buyimg.com/jdcms/s150x150_jfs/t1/168985/35/25959/188930/61ae101cE12371700/92be4fa17677a4b7.jpg',
        path: "pages/index/index?tuanid=100"
      }
    } else {
      // 如果用户点击的是胶囊按钮上的三个点，分享当前页面。
      return {
        title: '好物购买',
        imageUrl: 'https://img10.360buyimg.com/jdcms/s150x150_jfs/t1/168985/35/25959/188930/61ae101cE12371700/92be4fa17677a4b7.jpg',
        path: "pages/index/index"
      }
    }
  },

  // 开始搜索
  searchTap() {
    const that = this
    search('奶茶').then(markers=>{
      console.log('markers', markers)
      that.setData({markers})
    })
  },

  onPageScroll(e) {
    console.log('页面滚动了', e)
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('拍照成功', res)
        // wx.uploadFile()
      }
    })
  },

  scanCode(res) {
    // console.log('扫码成功', res)
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success(res) {
        console.log('扫码成功', res)
      },
      fail(err) {
        console.log('扫码失败', err)
      }
    })
  },

  chooseIdCard() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log('选择照片成功', res)
      }
    })
  },

  pay() {
    // 第一步，把用户要买的商品信息request给后端.then()
    // 第二步，接收后端返回的signtrue... package ....  ...
    // 第三步，调用 wx.requestPayment({success})
    // wx.chooseAddress({
    //   success(res) {
    //     console.log('选择地址', res)
    //   }
    // })
    wx.chooseInvoice({

    })
  }
})
