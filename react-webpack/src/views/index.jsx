import React from 'react'
import loadable from '@loadable/component'
const Loading = ()=>(<div>Loading...</div>)

// 代码分割（webpack支持代码分割）
// const TestJSX = loadable(()=>import('@/views/study/12/TestJSX'))
// const TestProps = loadable(()=>import('@/views/study/12/TestProps'))
// import TestState from '@/views/study/12/TestState'
// import TestEvent from '@/views/study/12/TestEvent'
// import TestCondition from '@/views/study/12/TestCondition'
// import TestList from '@/views/study/12/TestList'
// import TestForm from '@/views/study/12/TestForm'
// import TestLife from '@/views/study/12/TestLife'
// import TestLift from '@/views/study/14/TestLift'
// import TestCombine from '@/views/study/14/TestCombine'
// import TestContext from '@/views/study/16/TestContext'
// import TestHoc from '@/views/study/16/TestHoc'
// import TestHooks from '@/views/study/16/TestHooks'

// webapp
const ArticleList = loadable(()=>import('@/views/cnode/ArticleList'), {fallback:<Loading/>})
const ArticleDetail = loadable(()=>import('@/views/cnode/ArticleDetail'), {fallback:<Loading/>})
const Find = loadable(()=>import('@/views/find/Find'))
const User = loadable(()=>import('@/views/user/User'))

// 这是我们自己编写的一个路由信息数组
// 提示：在不同的Web应用，路由信息的设计不一定相同。
const routes = [
  { id: 2001, exact: true, path: '/', component: ArticleList },
  { id: 2004, exact: true, path: '/detail/:id', component: ArticleDetail },
  // 配合“嵌套路由”，不要加exact精准匹配
  { id: 2002, path: '/find', component: Find },
  { id: 2003, exact: true, path: '/user', component: User }
]

export default routes
