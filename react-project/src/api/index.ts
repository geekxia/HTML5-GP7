import fetch from '../utils/fetch'

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  )
}

export function fetchLogin(data:{username:String,password:String}) {
  return fetch({url:'/login', method:'POST', data})
}

export function fetchUserInfo() {
  return fetch({url:'/user/info', method:'GET'})
}

export function fetchArticleUpdate(data) {
  return fetch({url:'/article/update',method:'POST',data})
}

export function fetchArticleList(params) {
  return fetch({url:'/article/list',method:'GET',params})
}

export function fetchArticleInfo(params) {
  return fetch({url:'/article/info',method:'GET',params})
}

export function fetchChartData() {
  return fetch({url:'/chart',method:'POST',data:{}})
}
