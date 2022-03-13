import { connect } from 'react-redux'
import { countChange } from '@/store/actions'

export default connect(
  state => ({
    msg: state.study.msg
  }),
  dispatch => ({
    changeMsg: num => dispatch(countChange(num))
  })
)(
  props => (
    <div>
      <h1>{ props.msg }</h1>
      <button onClick={()=>props.changeMsg(2)}>修改MSG</button>
    </div>
  )
)
