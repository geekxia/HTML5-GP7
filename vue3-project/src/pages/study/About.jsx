import { defineComponent, reactive, readonly, isProxy, ref, isReactive, toRaw, markRaw, shallowReactive } from 'vue'

export default defineComponent((props,ctx)=>{
  let user = reactive({name:'zhangsan',age:20,info:{mobile:110}})
  console.log('user', user)
  const changeUser = () => user.info.mobile++

  let aa = readonly(reactive({a:100}))

  console.log('aa', isProxy(aa), isReactive(aa))
  console.log('user', isProxy(user), isReactive(user))

  console.log('xx', isProxy(ref(100)), isReactive(ref(200)))

  let bb1 = { name: 'bb', age: 30 }  // raw
  let bb2 = reactive(bb1)

  const changeBB2 = () => {
    bb2.age++
    console.log('bb1', bb1)
    console.log('bb2', bb2)
    console.log('bb raw', toRaw(bb2))
  }

  let cc = { name:'cc', age: 40 }
  let cc1 = markRaw(cc)
  let cc2 = reactive(cc1)
  console.log('cc2', isProxy(cc2), isReactive(cc2))

  let dd = { info: { name: 'dd', age: 50 }}
  let dd1 = shallowReactive(dd)
  const changeDD1 = ()=> {
    dd1.info.age++
  }

  return () => (
    <div>
      <h1>学习响应式的组合API</h1>
      <h2>{user.name} - {user.age}</h2>
      <h2>{user.info.mobile}</h2>
      <button onClick={changeUser}>修改手机</button>
      <hr/>

      <h2>{bb2.age}</h2>
      <button onClick={changeBB2}>改变[bb2.age]</button>
      <hr/>

      <h2>{dd1.info.age}</h2>
      <button onClick={changeDD1}>修改[dd1.info.age]</button>


    </div>
  )
})
