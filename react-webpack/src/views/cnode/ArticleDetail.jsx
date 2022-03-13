import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@/hooks'

export default () => {
  const { id } = useParams()
  console.log('params id', id)
  const query = useQuery()
  console.log('query articleId', query.articleId)

  // 接收动态的id参数，然后id调接口，渲染页面

  return (
    <div className='qf-article-detail'>
      <div>文章详情</div>
    </div>
  )
}
