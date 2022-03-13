export function fetchUserList() {
  return new Promise(resolve=>{
    resolve([
      {id:1,name:'zhangshan',age:10},
      {id:2,name:'lisi',age:20},
      {id:3,name:'wangwu',age:30}
    ])
  })
}
