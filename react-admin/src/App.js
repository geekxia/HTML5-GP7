import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import store from '@/store'
import zhCN from 'antd/lib/locale/zh_CN'
import System from '@/system'

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <System />
        </ConfigProvider>
      </Provider>
    </HashRouter>
  )
}
