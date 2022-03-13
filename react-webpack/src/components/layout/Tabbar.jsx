import React from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter, useHistory } from 'react-router-dom'
import tabs from './tabs'
import { useTab } from '@/hooks'

// 用了withRouter和路由hooks，二选一。
export default withRouter(
  () => {
    const history = useHistory()

    const [flag, tabIdx] = useTab(tabs)

    const switchTab = (ele) => {
      history.replace(ele.path)
    }

    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {
        tabs.map((ele, idx) => (
          <TabBar.Item
            icon={{ uri: ele.icon }}
            selectedIcon={{ uri: ele.iconOn }}
            title={ele.title}
            key={ele.id}
            selected={flag && tabIdx === idx}
            onPress={() => switchTab(ele)}
          />
        ))
        }
      </TabBar>
    )
  },
)
