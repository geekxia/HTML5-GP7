import axios from 'axios'
import { message } from 'antd'
import store from '@/store'
import { logout } from '@/store/actions'

const baseURL = 'http://localhost:9090'
const version = '/api/v2'

// 创建axios实例对象
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000, // 毫秒
  headers: {},
})

instance.interceptors.request.use((config) => {
  // 添加token鉴权
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, (error) => Promise.reject(error))

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    console.log('data code', response.data)
    // 数据过滤
    const { data } = response
    if (data && data.code===0) {
      return data.data
    } else if (data.err===-1) {
      console.log('--', data.code)
      store.dispatch(logout())
      window.location.replace('#/login')
    } else {
      return message.error(data.msg)
    }
  }
  return response
}, (error) => Promise.reject(error))

export default instance
