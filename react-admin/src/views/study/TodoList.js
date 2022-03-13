import { useSelector, useDispatch } from 'react-redux'
import { useState, useMemo } from 'react'
import './style.css'
import { addTodo, delTodo, editTodo, statusTodo } from '@/store/actions'

const TodoPanel = props => {
  const { title, list, status } = props
  const dispatch = useDispatch()
  return (
    <div className="panel">
      <div className="panel_title">
        <span>{ title }</span>
        <span>{ list.length }</span>
      </div>
      {
        list.map(ele=>(
          <div className={`panel_list ${status?'panel_list-done':''}`} key={ele.id}>
            <span onClick={()=>dispatch(statusTodo(ele.id))}></span>
            <span>
            {
              status
              ? <input
                value={ele.task}
                disabled
              />
              : <input
                value={ele.task}
                onChange={(ev)=>dispatch(editTodo({id:ele.id,task:ev.target.value}))}
              />
            }
            </span>
            <span onClick={()=>dispatch(delTodo(ele.id))}></span>
          </div>
        ))
      }
    </div>
  )
}

export default () => {
  const [task, setTask] = useState('')
  const list = useSelector(state=>state.todo.list)
  const dispatch = useDispatch()

  const [list1, list2] = useMemo(()=>{
    const list1 = list.filter(ele=>!ele.status)
    const list2 = list.filter(ele=>ele.status)
    return [list1, list2]
  }, [list])

  const confirm = (ev) => {
    if (ev.keyCode===13) {
      // 发送todo到store中
      dispatch(addTodo(task))
      setTask('')
    }
  }

  return (
    <div className='app'>
      <div className="app_bar">
        <div>
          <span>TODOS</span>
          <input
            type="text"
            value={task}
            onChange={ev=>setTask(ev.target.value)}
            onKeyUp={confirm}
            placeholder="添加todos" />
        </div>
      </div>

      <TodoPanel list={list1} title='正在进行' />
      <TodoPanel list={list2} title='已经完成' status />

      <div className="app_bot">此TODO由GP7班制作完成</div>
    </div>
  )
}
