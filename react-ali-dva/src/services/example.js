import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function fetchUserList() {
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve([
        {id:1,name:'zhangsan',age:10},
        {id:2,name:'lisi',age:20},
        {id:3,name:'wangwu',age:30}
      ])
    })
  })
}
