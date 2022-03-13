import { PureComponent } from 'react'
import { qfconnect1 } from './qf'
import { countChange } from '@/store/actions'

// 语法：connect(mapStateToProps, mapDispatchToProps)(UI)
// 把store.getState()返回的状态数据放在props上
function mapStateToProps(state) {
  // do something
  return {
    msg: state.study.msg
  }
}
// 把store.dispatch传递给props用于封装方法
function mapDispatchToProps(dispatch){
  return {
    changeMsg: num=>dispatch(countChange(num))
  }
}

@qfconnect1(mapStateToProps, mapDispatchToProps)
class TestRedux1 extends PureComponent {
  render () {
    console.log('props', this.props)
    const { msg, changeMsg } = this.props
    console.log('-----msg', msg)
    return (
      <div>
        <h1>{ msg }</h1>
        <button onClick={()=>changeMsg(10)}>修改MSG</button>
      </div>
    )
  }
}

export default TestRedux1
