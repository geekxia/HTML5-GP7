import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Select } from 'antd'

import { listRole } from '@/store/actions'

const { Option } = Select

export default ({value, onChange}) => {
  const dispatch = useDispatch()
  const { roleList } = useSelector(state=>state.admin)
  useEffect(()=>{
    if (roleList.length===0) dispatch(listRole())
  }, [])
  const change = val => {
    const row = roleList.find(ele=>ele.role===val)
    onChange(row)
  }
  return (
    <Select
      style={{width:'120px'}}
      value={value}
      onChange={val=>change(val)}
    >
    {
      roleList.map(ele=>(
        <Select.Option key={ele._id} value={ele.role}>
        {ele.role_name}
        </Select.Option>
      ))
    }
    </Select>
  )
}
