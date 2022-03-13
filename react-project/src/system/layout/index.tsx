import { Layout } from 'antd'
import QfHeader from './QfHeader'
import QfContent from './QfContent'
import QfSider from './QfSider'
import './style.scss'

export default () => {
  return (
    <div className='qf-layout'>
      <Layout>
        <QfSider />
        <Layout>
          <QfHeader />
          <QfContent />
        </Layout>
      </Layout>
    </div>
  )
}
