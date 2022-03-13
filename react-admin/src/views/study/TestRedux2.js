import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { countChange } from '@/store/actions'

class TestRedux2 extends PureComponent {
  render () {
    console.log('props', this.props)
    const { msg, changeMsg } = this.props
    return (
      <div>
        <h1>{ msg }</h1>
        <button onClick={()=>changeMsg(-5)}>修改MSG</button>
      </div>
    )
  }
}

export default connect(
  state => ({
    msg: state.study.msg
  }),
  dispatch => ({
    changeMsg: num => dispatch(countChange(num))
  })
)(TestRedux2)
