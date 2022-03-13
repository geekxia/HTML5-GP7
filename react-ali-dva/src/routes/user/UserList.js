import React from 'react'
import { connect } from 'dva';

class UserList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({type:'user/getList', payload: {page:1,size:2}})
  }
  render () {
    console.log('UserList props', this.props)
    const { list, history } = this.props
    return (
      <div>
        <h1>用户列表</h1>
        <div>
        {
          list.map(ele=>(
            <div
              onClick={()=>history.push('/user/info/'+ele.id)}
              key={ele.id}>
              {ele.id} - {ele.name} - {ele.age}
            </div>
          ))
        }
        </div>
      </div>
    )
  }
}

export default connect(model=>model.user)(UserList)
