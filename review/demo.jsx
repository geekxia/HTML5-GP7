export default () => {
  const [count, setCount] = useState(1)
  const change = useCallback((payload)=>{
    dispatch({type,payload})
    setCount(payload)
  })
  useSelect
  useEffect(()=>{

  })
  return [count, change]
}



// Home.jsx
import useCount from './demo.jsx'
export default () => {
  const [count, change] = useCount()

  const [a, setA] =
  const changeA = () => {
    ///
  }

  const [b, setB] = us
  const foo1 =
  const foo2 =
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>change(100)}>修改</button>

    </div>
  )
}
