import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Tree } from 'antd'

export default ({value,onChange}) => {
  const { menuList } = useSelector(state=>state.admin)
  return (
    <div className='qf-menu-tree'>
      <Tree
        checkable
        onCheck={keys=>onChange(keys)}
        checkedKeys={value}
        treeData={menuList}
        fieldNames={{title:'text',key:'_id',children:'children'}}
      />
    </div>
  )
}
