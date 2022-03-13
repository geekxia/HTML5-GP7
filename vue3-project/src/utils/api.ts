import axios from './request'

export function fetchList(params) {
  return axios({url:'/topics',method:'GET',params})
}
