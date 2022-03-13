import axios from 'axios'

const baseURL = 'http://localhost:8080'
const version = '/api/v1'

// 创建axios实例对象
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000, // 毫秒
  headers: {},
})

instance.interceptors.request.use((config) => {
  console.log('-')
  return config
}, (error) => Promise.reject(error))

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    // 数据过滤
    if (response.data && response.data.success) {
      return response.data.data
    }
  }
  return response
}, (error) => Promise.reject(error))

export default instance
