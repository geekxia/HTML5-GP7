import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

// 原则：一切外部数据都要从props进来。
export default inject('study')(
  observer(
    ({ study }) => {
      console.log('rendered', study.list)
      const history = useHistory()

      useEffect(()=>{
        const params = { tab: '', page: 1, limit: 5 }
        // 触发mobx走流程
        study.getList(params)
      }, [])

      const skipToDetail = ele => {
        console.log('press')
        history.push(`/detail/${ele.id}?articleId=${ele.id}`)
      }

      return (
        <div className='qf-article-list'>
          {
            study.list.map(ele=>(
              <div key={ele.id} onClick={()=>skipToDetail(ele)}>
                { ele.title }
              </div>
            ))
          }
        </div>
      )
    }
  )
)
