import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import './style.css'
import { listTodo, addTodo, delTodo, editTodo, statusTodo } from '@/store/actions'

const TodoPanel = props => {
  const { title, list } = props
  const dispatch = useDispatch()
  return (
    <div className="panel">
      <div className="panel_title">
        <span>{ title }</span>
        <span>{ list.length }</span>
      </div>
      {
        list.map(ele=>(
          <div className={`panel_list ${!ele.done?'panel_list-done':''}`} key={ele._id}>
            <span onClick={()=>dispatch(statusTodo(ele))}></span>
            <span>
            {
              !ele.done
              ? <input
                value={ele.task}
                disabled
              />
              : <input
                defaultValue={ele.task}
                onBlur={(ev)=>dispatch(editTodo({id:ele._id,new_task:ev.target.value}))}
              />
            }
            </span>
            <span onClick={()=>dispatch(delTodo(ele._id))}></span>
          </div>
        ))
      }
    </div>
  )
}

export default () => {
  const [task, setTask] = useState('')
  const dispatch = useDispatch()
  const list1 = useSelector(state=>state.todo.undone)
  const list2 = useSelector(state=>state.todo.done)
  const count = useSelector(state=>state.todo.count)

  useEffect(()=>{
    // 派发一个action生成器(业务逻辑)
    dispatch(listTodo({}))
  }, [count])

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
      <TodoPanel list={list2} title='已经完成' />

      <div className="app_bot">此TODO由GP7班制作完成</div>
    </div>
  )
}
