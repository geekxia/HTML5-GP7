import axios from 'axios'

// const baseURL = 'https://c.y.qq.com'
const baseURL = 'http://localhost:8080'

// 创建axios实例对象
const instance = axios.create({
  baseURL,
  timeout: 5000, // 毫秒
  headers: {}
})

// 给实例对象添加请求拦截器（出门）
instance.interceptors.request.use(function (config) {
  // 添加token（鉴权信息）
  return config
}, function (error) {
  return Promise.reject(error)
})

// 给实例对象添加响应拦截器（进门）
instance.interceptors.response.use(function (response) {
  // 做统一的错误处理
  if (response.status===200) {
    // 数据过滤
    if(response.data && response.data.code===0 && response.data.subcode===0) {
      return response.data.data
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// 抛出实例对象
export default instance
