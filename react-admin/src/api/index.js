import fetch from '@/utils/fetch'

// 【TodoList】
export function fetchTodoList(params) {
  return fetch({url:'/todo/getTodoList',method:'GET',params})
}

export function fetchTodoAdd(data) {
  return fetch({url:'/todo/addTodo',method:'POST',data})
}

export function fetchTodoDel(params) {
  return fetch({url:'/todo/delTodo',method:'GET',params})
}

export function fetchTodoStatus(params) {
  return fetch({url:'/todo/transferTodo',method:'GET',params})
}

export function fetchTodoEdit(data) {
  return fetch({url:'/todo/updTodo',method:'POST',data})
}


// 【用户相关接口】

export function fetchLogin(data) {
  return fetch({url:'/login',method:'POST',data})
}

export function fetchUserInfo(params) {
  return fetch({url:'/user/info',method:'GET',params})
}

export function fetchMenuAdd(data) {
  return fetch({url:'/menu/add',method:'POST',data})
}

export function fetchMenuList(params) {
  return fetch({url:'/menu/list',method:'GET',params})
}

export function fetchRoleAdd(data) {
  return fetch({url:'/role/add',method:'POST',data})
}

export function fetchRoleList(params) {
  return fetch({url:'/role/list',method:'GET',params})
}

export function fetchRoleInfo(params) {
  return fetch({url:'/role/info',method:'GET',params})
}

export function fetchUserAdd(data) {
  return fetch({url:'/user/add',method:'POST',data})
}

export function fetchUserList(params) {
  return fetch({url:'/user/list',method:'GET',params})
}

export function fetchUserStatus(params) {
  return fetch({url:'/user/status',method:'GET',params})
}
