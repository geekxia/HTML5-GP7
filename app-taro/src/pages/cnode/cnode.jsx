import { useEffect, useState } from 'react'

import { View } from '@tarojs/components'
import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro'

import { useSelector, useDispatch } from '@/hooks'
import './cnode.scss'

export default () => {
  const [params, setParams] = useState({page:1,limit:10})
  const dispatch = useDispatch()
  const list = useSelector(state=>state.cnode.list)
  // console.log('---list', list.length)

  useEffect(()=>{
    dispatch({type:'cnode/getList',payload:params})
  }, [params])

  useReachBottom(()=>{
    setParams({...params, page: params.page+1})
  })

  useEffect(()=>{
    console.log('--- stop')
    // 停止掉下拉刷新的“卡顿”状态
    if (list.length===params.limit) Taro.stopPullDownRefresh()
  }, [list])

  usePullDownRefresh(()=>{
    dispatch({type:'cnode/resetList',payload:''})
    setParams({...params, page:1})
  })

  return (
    <View>
      <View>cnode</View>
      {
        list.map(ele=>(
          <View className='row' key={ele.id}>{ele.title}</View>
        ))
      }
    </View>
  )
}
