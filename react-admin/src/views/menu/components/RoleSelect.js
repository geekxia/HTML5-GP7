import { useSelector } from 'react-redux'

import { Select } from 'antd'
const { Option } = Select

export default ({value,onChange}) => {
  const { roleList } = useSelector(state=>state.admin)
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
      <Option value=''>选择角色</Option>
    {
      roleList.map(ele=>(
        <Option key={ele._id} value={ele.role}>
          {ele.role_name}
        </Option>
      ))
    }
    </Select>
  )
}
