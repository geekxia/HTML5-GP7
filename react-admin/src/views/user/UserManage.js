import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'

import { Row, Col, Input, Select, Button, Table, Tag, Space, message } from 'antd'
import './style.scss'

import RoleSelect from './components/RoleSelect'
import { addUser, resetAdmin, listUser, statusUser } from '@/store/actions'

// 新增用户的表单绑定
const initForm = {
  username:'',
  role:'',
  role_name:'',
  id_card:'',
  mobile:'',
  done: 0
}
export default () => {
  const dispatch = useDispatch()
  // 用于新增用户的表单绑定
  const [form, setForm] = useState(initForm)
  // 用于列表查询
  const [params, setParams] = useState({page:1,size:2,username:''})

  const { done, userTable } = useSelector(state=>state.admin)

  // 当用户新增成功时执行
  useEffect(()=>{
    if(done===1) {
      message.success('添加成功')
      setForm(initForm)
      // dispatch(listUser(params))
      setParams({...params,page:1})
    }
  }, [done])

  // 当row操作（禁用或启用）时执行
  useEffect(()=>{
    if (done===2) dispatch(listUser(params))
  }, [done])

  // 当页面初始化、params变化时执行
  useEffect(()=>{
    dispatch(listUser(params))
  }, [params])

  // 事件：点击“禁用”或“启用”时
  const rowHandle = row => {
    console.log('row', row)
    dispatch(statusUser({user_id:row._id, status:(row.status+1)%2}))
  }

  // 用于“用户新增”的表单取值
  const formChange = (key, ev) => {
    // 对RoleSelect有问题
    if (key==='role') {
      setForm({...form, role:ev.role, role_name:ev.role_name})
    } else {
      setForm({...form, [key]:ev.target.value})
    }
  }

  // 事件：点击“添加”用户时执行
  const submitAdd = () => {
    console.log('提交', form)
    // 表单校验
    dispatch(addUser(form))
  }

  const columns = useMemo(()=>(
    [
      {
        align: 'center',
        title: '序号',
        key: 'index',
        dataIndex: 'id',
        render: (text,row,index)=><div>{index}</div>
      },
      {
        align: 'center',
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        render: text => <a>{text}</a>,
      },
      {
        align: 'center',
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      },
      {
        align: 'center',
        title: '角色名称',
        dataIndex: 'role_name',
        key: 'role_name',
      },
      {
        align: 'center',
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status=>(status?'正常':'已被禁用')
      },
      {
        align: 'center',
        title: '操作',
        key: 'tags',
        dataIndex: 'tags',
        render: (text,row) => (
          <>
            <Button
              size='small'
              onClick={()=>rowHandle(row)}
              type="primary">
              { row.status ? '禁用' : '启用' }
            </Button>
            <Button size='small' type="primary" style={{marginLeft:'10px'}}>编辑</Button>
            <Button size='small' danger style={{marginLeft:'10px'}}>删除</Button>
          </>
        ),
      }
    ]
  ), [])

  return (
    <div className='qf-user-manage'>

      <div className='user-add'>
        <Row align='middle'>
          <Col span={2} className='label'>用户名:</Col>
          <Col span={4}>
            <Input value={form.username} onChange={ev=>formChange('username',ev)} />
          </Col>
          <Col span={2} className='label'>角色:</Col>
          <Col span={4}>
            <RoleSelect value={form.role} onChange={ev=>formChange('role',ev)} />
          </Col>
          <Col span={2} className='label'>身份证:</Col>
          <Col span={6}>
            <Input value={form.id_card} onChange={ev=>formChange('id_card',ev)} />
          </Col>
        </Row>
        <Row align='middle' style={{marginTop:'20px'}}>
          <Col span={2} className='label'>手机号:</Col>
          <Col span={4}>
            <Input value={form.mobile} onChange={ev=>formChange('mobile',ev)} />
          </Col>
        </Row>
        <Row align='middle' style={{marginTop:'20px'}}>
          <Col span={2} className='label'></Col>
          <Col span={4}>
            <Button type="primary" onClick={submitAdd}>添加</Button>
          </Col>
        </Row>
      </div>

      <div className='user-table'>
        <Table
          columns={columns}
          dataSource={userTable.list||[]}
          rowKey='_id'
          pagination={{
            total: userTable.total||0,
            current: params.page,
            defaultPageSize: params.size,
            showTotal: (total, range) => `第${range[0]}-${range[1]}条 / 总共${total}条`,
            pageSizeOptions: [2,5,10,20],
            size: 'small',
            showQuickJumper: true,
            showSizeChanger: true,
            onChange:(page,size) => setParams({...params,page,size})
          }}
          title={() => (
            <Input.Search
              style={{width:'150px'}}
              placeholder="搜索"
              allowClear
              onSearch={val=>setParams({...params,username:val,page:1})}
            />
          )}
        />
      </div>
    </div>
  )
}
