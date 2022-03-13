// mobx编写语法支持ES5语法、也支持ES6语法，我们建议使用ES6语法。
// 原则：使用状态管理工具，一定要分模块。

// 子store
import StudyStore from './modules/study'
import UserStore from './modules/user'

// 根store
class Store {
  constructor() {
    this.study = new StudyStore()
    this.user = new UserStore()
  }
}

export default new Store()
