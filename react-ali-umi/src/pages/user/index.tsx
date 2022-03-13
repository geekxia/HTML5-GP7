import { useEffect } from 'react'
import { useDispatch, useSelector, history } from 'umi'

export default () => {
  const dispatch = useDispatch()
  const { list } = useSelector(model=>model.user)
  console.log('----list', list)
  useEffect(()=>{
    dispatch({type:'user/getList',payload:{page:1}})
  }, [])
  return (
    <div>
      <div>用户列表页</div>
      <div>
      {
        list.map(ele=>(
          <div
            onClick={()=>history.push('/user/list/'+ele.id)}
            key={ele.id}>
            {ele.id} - {ele.name} - {ele.age}
          </div>
        ))
      }
      </div>
    </div>
  )
}
