import React from 'react'
import { useLocation } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => {
    const result = {}
    search.replace('?', '').split('&').forEach(ele=>{
      const arr = ele.split('=')
      result[arr[0]] = arr[1]
    })
    return result
  }, [search])
}

// 入参：是自定义的tabs路由信息
// 返回值：[flag, tabIdx]  flag是否是tabbar页面  tabIdx是tabbar索引号
function useTab(tabs) {
  const { pathname } = useLocation()

  return React.useMemo(()=>{
    // 计算是不是tabbar页面
    const p = pathname.split('/')[1]
    const r = tabs.filter(ele=>ele.path === `/${p}`)
    // 计算得出当前tabbar索引号
    let idx = 1
    if (pathname === '/') idx = 0
    if (pathname === '/user') idx = 2

    return [r.length !== 0, idx]
  }, [pathname, tabs])
}

export {
  useQuery,
  useTab,
}
