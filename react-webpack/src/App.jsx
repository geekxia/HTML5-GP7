import React from 'react'
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'

import { Layout } from '@/components'
import store from '@/store'

async function test() {
  const num = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(100)
    }, 1000)
  })
  console.log('num', num)
}

test()

export default function App() {
  return (
    <HashRouter>
      <Provider {...store}>
        <Layout />
      </Provider>
    </HashRouter>
  )
}
