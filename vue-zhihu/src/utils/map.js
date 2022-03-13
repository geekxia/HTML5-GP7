import store from '@/store'

export function qfMapState(space, arr) {
  const result = {}
  arr.forEach(k=>{
    console.log('k', k)
    result[k] = function(){
      return store.state[space][k]
    }
  })
  console.log('result', result)
  return result
}
