import React from 'react'

import { ConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import { LangProvider } from '@/lang'
import { useAppSelector } from '@/hooks'

import System from './System'

// 实现国际化
import zhCN from 'antd/lib/locale/zh_CN'
import enGB from 'antd/lib/locale/en_GB'
import zhHK from 'antd/lib/locale/zh_HK'

import zhCNi from '@/lang/zh_CN'
import enGBi from '@/lang/en_GB'
import zhHKi from '@/lang/zh_HK'

const langArr = {
  'zh-CN': zhCN,
  'en-GB': enGB,
  'zh-HK': zhHK
}

const langArri = {
  'zh-CN': zhCNi,
  'en-GB': enGBi,
  'zh-HK': zhHKi
}


export default () => {
  const { lang } = useAppSelector(state=>state.layout)
  console.log('app lang', lang, langArr[lang])
  const ipLocal = lang.split('-')[0]
  return (
    <ConfigProvider locale={langArr[lang]}>
      {/*
        <IntlProvider locale={ipLocal} messages={langArri[lang]}>
          <System />
        </IntlProvider>
      */}
      <LangProvider value={langArri[lang]}>
        <System />
      </LangProvider>
    </ConfigProvider>
  )
}
