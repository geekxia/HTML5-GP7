import { observable, action } from 'mobx'

export default class Count {
  @observable
  counter = 0

  @action
  counterStore() {
    this.counter++
  }

  @action
  increment(step) {
    this.counter+=step
  }

  @action
  decrement(step) {
    this.counter-=step
  }

  @action
  incrementAsync(step) {
    return new Promise(resolve=>{
      setTimeout(() => {
        this.counter+=step
        resolve()
      }, 1000)
    })
  }
}
