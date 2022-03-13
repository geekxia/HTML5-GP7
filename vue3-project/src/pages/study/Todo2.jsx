import { defineComponent, computed, ref } from 'vue'

const TodoList = defineComponent(()=>{
  let task = ref('')
  let list = ref([])
  const confirm = () => {
    list.value.push({id:Date.now(),task:task.value})
    task.value = ''
  }
  const remove = (row) => {
    list.value = list.value.filter(ele=>ele.id!==row.id)
  }

  // 返回值是ref对象
  const length = computed(()=>{
    console.log('-----', list)
    // do something
    return list.value.length
  })

  return () => (
    <>
      <input type="text" value={task.value} onChange={e=>task.value=e.target.value} />
      <button onClick={confirm}>添加</button>
      <hr/>

      {
        list.value.map(ele=>(
          <div>
          <span>{ele.id}</span>
          :
          <span>{ele.task}</span>
          :
          <span onClick={()=>remove(ele)}>X</span>
          </div>
        ))
      }
      <div>目前的任务数量: {length.value}</div>
    </>
  )
})

const Counter = defineComponent(()=>{
  let count = ref(0)
  const setCount = step => {
    count.value += step
  }
  return () => (
    <>
      <h1>{count.value}</h1>
      <button onClick={()=>setCount(-1)}>自减</button>
      <button onClick={()=>setCount(2)}>自增</button>
    </>
  )
})

export default defineComponent(()=>{
  return () => (
    <>
      <TodoList />
      <hr/>
      <Counter />
    </>
  )
})
