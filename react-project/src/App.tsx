import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store'

import System from '@/system/index.tsx'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <System />
      </Provider>
    </HashRouter>
  )
}

export default App
