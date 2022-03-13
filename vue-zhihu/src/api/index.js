import fetch from '@/utils/fetch'

// 大多数情况下调接口，只用三件事：
// 1、url => 404
// 2、method => 404等其它错误
// 3、入参 => 有哪些必填参数、参数的数据类型


// import { fetchQqList } from ''
export function fetchQqList(params) {
  return fetch({
    url: '/splcloud/fcgi-bin/gethotkey.fcg',
    method: 'GET',
    params
  })
}

// function fetchLogin(data) {
//   return fetch({
//     url: '/api/v1/login',
//     method: 'POST',
//     data
//   })
// }

// import api from ''
export default {
  fetchQqList
}
