import Count from './modules/count'
import Cnode from './modules/cnode'

class Store {
  constructor() {
    this.count = new Count()
    this.cnode = new Cnode()
  }
}
export default new Store()
