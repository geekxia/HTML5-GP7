import Taro from '@tarojs/taro'

export function fetch(url,method,data) {
  return new Promise(resolve=>{
    Taro.request({
      url: 'https://cnodejs.org/api/v1'+url,
      method,
      data,
      success(res) {
          console.log('res', res)
        if (res.statusCode===200) {

          resolve(res.data.data)
        }
      },
      fail(err) {

      }
    })
  })
}

export function fetchCnode(data) {
  return fetch('/topics', 'GET', data)
}
