import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { baseURL } from '@/config'

// const baseURL = 'https://c.y.qq.com'
// const baseURL = 'http://localhost:8001'

const version = '/api/v1'

// 创建axios实例对象
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000, // 毫秒
  headers: {}
})

// 给实例对象添加请求拦截器（出门）
instance.interceptors.request.use(function (config) {
  // 添加token（鉴权信息）
  config.headers.Authorization = store.state.user.token
  return config
}, function (error) {
  return Promise.reject(error)
})

// 给实例对象添加响应拦截器（进门）
instance.interceptors.response.use(function (response) {
  // 做统一的错误处理
  if (response.status===200) {
    // 数据过滤
    if (response.data && response.data.err===0) {
      return response.data.data
    } else if (response.data.err === -1) {
      return response.data.data
      // 在这里不再做跳转/login，我改在App中去实现
    } else {
      Toast.fail(response.data.msg)
    }
  } else {
    Toast.fail('网络异常')
  }
  return response
}, function (error) {
  Toast.fail('网络异常')
  return Promise.reject(error)
})

// 抛出实例对象
export default instance
