import request from '@/utils/request'

export function fetchArticleList(params) {
  return request({ url: '/topics', method: 'GET', params })
}

export default {}
