// 如果是本地调用和开发，在微信开发者工具把“不校验http”打勾
// 如果是上线，在小程序管理后台进行配置（这个域名必须是https、备过案）
const baseURL = 'https://cnodejs.org'
const version = '/api/v1'

function request(url,method,data){
  return new Promise(resolve=>{
    wx.request({
      url,
      method,
      data,
      headers: {
        'X-Token': wx.getStorageSync('token')
      },
      success(res) {
        // 数据过滤
        if (res.statusCode === 200) {
          resolve(res.data.data)
        }
      }
    })
  })
}

function requestArticle(data) {
  return request(`${baseURL}${version}/topics`,'GET',data)
}

function login(data) {
  return request('http://localhost:9999/api/v1/wechat/login', 'GET', data)
}



module.exports = {
  requestArticle,
  login
}
