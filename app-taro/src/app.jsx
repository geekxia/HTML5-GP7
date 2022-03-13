import { Component, useEffect } from 'react'
import { Provider, MobXProviderContext, observer } from 'mobx-react'
import store from './store'
import './app.scss'
import Taro, { useDidShow } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'

// 相当于是微信小程序app.js(App组件)
export default props => {
  // 相当于是onLaunch()
  // useDidShow(()=>{
  //   console.log('app lunch--')
  //   // 登录
  //   Taro.login().then(res=>{
  //     console.log('code', res.code)
  //   })
  //   // 自动弹出地理位置
  // })

  useEffect(()=>{
    console.log('app lunch--')
    // 登录
    Taro.login().then(res=>{
      console.log('code', res.code)
    })
  }, [])

  useEffect(()=>{
    Taro.getSetting().then(res=>{
      console.log('当前用户的授权情况', res.authSetting)
      if (!res.authSetting['scope.userLocation']) {
        Taro.authorize({scope:'scope.userLocation'})
          .then(res=>console.log('用户同意了', res))
          .catch(err=>console.log('用户未同意', err))
      }
    })
  }, [])

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}
