import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/element/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/element/getUserInfo',
    method: 'get',
    params: {}
  })
}

// 暂时未用到
export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function fetchUserList(params) {
  return request({
    url: '/element/user/list',
    method: 'GET',
    params
  })
}

export function fetchUserAdd(data) {
  return request({
    url: '/element/user/add',
    method: 'POST',
    data
  })
}

export function fetchUserUpd(params) {
  return request({
    url: '/element/user/upd',
    method: 'GET',
    params
  })
}

export function fetchRoleList(params) {
  return request({
    url: '/element/role/list',
    method: 'GET',
    params
  })
}

export default {
  fetchUserList,
  fetchUserAdd,
  fetchUserUpd,
  fetchRoleList
}
