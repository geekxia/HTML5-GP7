import { useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Table, Button } from 'antd'
import './style.scss'

import { listRole } from '@/store/actions'

export default () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { roleList } = useSelector(state=>state.admin)

  useEffect(()=>{
    dispatch(listRole())
  }, [])

  const columns = useMemo(()=>(
    [
      {
        title: '员工角色',
        dataIndex: 'role_name',
        key: 'role_name',
        align: 'center'
      },
      {
        title: '描述',
        dataIndex: 'role_desc',
        key: 'role_desc',
        align: 'center'
      },
      {
        title: '员工数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center'
      },
      {
        title: '操作',
        key: 'tags',
        dataIndex: 'tags',
        align: 'center',
        render: (text,row)=>(
          <>
            <Button
              type='primary'
              onClick={()=>history.push(`/role/edit/${row._id}`)}
              size='small'>
              编辑
            </Button>
            <Button
              danger
              size='small'
              style={{marginLeft:'10px'}}>
              删除
            </Button>
          </>
        )
      }
    ]
  ), [roleList])

  return (
    <div className='qf-role-manage'>
      <Table
        columns={columns}
        dataSource={roleList}
        rowKey='_id'
        title={()=><Button type='primary' onClick={()=>history.push('/role/create')}>添加角色</Button>}
      />
    </div>
  )
}
