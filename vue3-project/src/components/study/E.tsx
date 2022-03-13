import { defineComponent, ref, triggerRef } from 'vue'

// 这种写法,不建议,原因是这里面能够使用data/methods....
// export default defineComponent({
//   // 在jsx语法中，setup的返回值是render函数。
//   setup(props, ctx) {
//     console.log('tsx props', props)
//     let count = ref(0)
//     const add = () => count.value++
//     const sub = () => count.value--
//     return () => (
//       <>
//         <h1>第五个组件E</h1>
//         <button onClick={sub}>自减</button>
//         <h1 className='box'>{count.value}</h1>
//         <button onClick={add}>自增</button>
//       </>
//     )
//   }
// })

// 这就是函数式组件，函数式组件本来就相当于是render函数
export default defineComponent((props,ctx)=>{
  console.log('tsx props', props)
  const count = ref(0)
  return () => (
    <>
      <h1>第五个组件E</h1>
      <button onClick={()=>count.value--}>自减</button>
      <h1 className='box'>{count.value}</h1>
      <button onClick={()=>count.value++}>自增</button>
    </>
  )
})
