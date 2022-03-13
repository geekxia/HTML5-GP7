import { makeAutoObservable } from 'mobx'

// makeAutoObservable(this) 作用是把当前对象上的成员属性变成observable变量，把成员方法变成action方法。

export default class UserStore {
  constructor() {
    makeAutoObservable(this)
  }
  token = 'token'
}
