import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Table } from 'antd'
import './style.scss'
import moment from 'moment'
console.log('moment', moment)

import QfTable from './components/QfTable'
import { listArticle } from '@/store/reducers/article'

import { FormattedMessage, useIntl } from 'react-intl'
import { useLang } from '@/lang'

const buttons = [
  ['导出', ()=>{} ],
  ['删除', ()=>{}, {danger:true}]
]

export default () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState<any>('')

  // const intl = useIntl()
  const lang = useLang()
  console.log('---lang', lang)


  const columns = [
    ['标题', 'title'],
    ['作者', 'author'],
    ['置顶', 'top', (text)=>(<div>{text?'是':'否'}</div>)],
    ['发布时间', 'create_time', (text)=>(<div>{moment(text).format('YYYY年MM月DD日')}</div>)],
    [
      // ['删除', ()=>{}, {danger:true} ],
      ['编辑', (row)=>{navigate(`/article/edit/${row._id}`)} ]
    ]
  ]

  return (
    <div className='qf-article-list'>
      <div className='top'>
        <div>{lang['article.title']}</div>
        <div className='search'>
          <Input
            onPressEnter={(e:any)=>setTitle(e.target.value)}
            onChange={(e:any)=>{e.target.value===''&&setTitle('')}}
          />
          <Button type='primary'>搜索</Button>
        </div>
      </div>
      <article>
        <QfTable
          title={lang['article.title']}
          request={listArticle}
          query={{title}}
          columns={columns}
          buttons={buttons}
          skipTo={()=>navigate('/article/add')}
        />
      </article>
    </div>
  )
}
