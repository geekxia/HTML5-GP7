import { Component } from 'react'
// 引入组件有两种方式，一种Taro原生组件（对应小程序组件）、另一种是Taro-UI（二次封装）
// cnpm i taro-ui@next -S  期待v3正式发布（v2在这个环境中可能有问题）
// 扩展：@nutui/*  期待这个UI组件，未来也支持taro+react编程风格。
import { View, Button, Text} from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
import { useShareAppMessage } from '@tarojs/taro'

import { useSelector, useDispatch } from '../../hooks'

export default (props) => {
      const counter = useSelector(state=>state.count.counter)
      const dispatch = useDispatch()

      useShareAppMessage(res=>{
        console.log('share res', res)
        if (res.from ==='button') {}
      })

      return (
        <View className='index'>
          <AtButton type='primary' openType='share'>按钮文案</AtButton>
          <Button onClick={()=>dispatch({type:'count/increment',payload:1})}>+</Button>
          <Button onClick={()=>dispatch({type:'count/decrement',payload:2})}>-</Button>
          <Button onClick={()=>dispatch({type:'count/incrementAsync',payload:3})}>Add Async</Button>
          <View style={{fontSize:'60rpx',textAlign:'center'}}>{counter}</View>
        </View>
      )
    }
