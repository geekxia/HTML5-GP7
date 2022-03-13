import { useSelector } from 'react-redux'

import { Select, Button, Row, Col } from 'antd'

const { Option } = Select

export default ({value,onChange}) => {
  const { menuList } = useSelector(state=>state.admin)
  return (
    <div className='qf-module-select'>
      <Select value={value} onChange={val=>onChange(val)}>
        {
          menuList.map(ele=>(
            <Option key={ele._id} value={ele.path}>{ele.text}</Option>
          ))
        }
      </Select>
    </div>
  )
}
