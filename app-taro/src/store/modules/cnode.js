import { observable, action } from 'mobx'

import { fetchCnode } from '@/utils/request'

export default class Cnode {
  @observable
  list = []

  @action
  resetList() {
    this.list = []
  }

  @action
  getList(data) {
    return fetchCnode(data).then(list=>{
      console.log('文章列表', list)
      this.list = [...this.list, ...list]
    })
  }
}
