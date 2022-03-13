import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Input, InputNumber, Button, Select, Table, Modal } from 'antd'
import ModuleSelect from './components/ModuleSelect'
import './style.scss'

import { addMenu, listMenu } from '@/store/actions'

const { Option } = Select

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const columns = [
  {
    title: '模块名称',
    dataIndex: 'text',
    key: 'text',
    align: 'center'
  },
  {
    title: 'PATH路由',
    align: 'center',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: 'ICON图标',
    align: 'center',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: '组件名称',
    align: 'center',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'handle',
    key: 'handle',
    render: () => (
      <>
        <Button type='primary' size='small'>编辑</Button>
        <Button danger size='small' style={{marginLeft:'10px'}}>删除</Button>
      </>
    )
  }
]

export default () => {
  const dispatch = useDispatch()
  // flag=0 表示添加模块  flag=1 表示添加菜单
  const [flag,setFlag] = useState(0)
  // 控制Modal弹框的显示与隐藏
  const [show, setShow] = useState(false)

  const [form] = Form.useForm()

  // 从store取出，menuList是处理好的多维的菜单数据
  const { done, menuList } = useSelector(state=>state.admin)

  // 相当于是页面重置
  useEffect(()=>{
    // 页面重置
    setShow(false)
    form.resetFields()
    dispatch(listMenu())
  }, [done])

  // 事件：点击表头上的两个按钮
  const showModal = flag => {
    setFlag(flag)
    setShow(true)
  }
  // 事件：点击Modal弹框上的“确定”按钮
  const submit = () => {
    let data = form.getFieldsValue()
    data.module = flag
    // 对“添加菜单”做差异化处理
    if (flag===1) {
      const mm = menuList.find(ele=>ele.path===data.super)
      // 把父模块的path拼接到当前菜单的path上
      data.path = `${mm.path}${data.path}`
      // pid是为了生成“树”
      data.pid = mm._id
    }
    // 触发走redux流程
    dispatch(addMenu(data))
  }

  return (
    <div className='qf-menu-manage'>
      <div className='menu-table'>
        <Table
          columns={columns}
          dataSource={menuList}
          pagination={false}
          rowKey='_id'
          title={()=>(
            <>
              <Button
                type='primary'
                onClick={()=>showModal(0)}
              >
                添加模块
              </Button>
              <Button
                style={{marginLeft:'10px'}}
                onClick={()=>showModal(1)}
                type='primary'>添加菜单</Button>
            </>
          )}
        />
      </div>

      {/*添加菜单的弹框*/}
      <Modal
        title={flag===1?'添加菜单':'添加模块'}
        visible={show}
        onOk={()=>submit()}
        forceRender
        onCancel={()=>setShow(false)}>
        <Form
          labelCol={{span:6}}
          wrapperCol={{span:16}}
          form={form}          
          validateMessages={validateMessages}>
          {
            flag===1 &&
            <Form.Item
              name='super'
              label="选择模块"
            >
              <ModuleSelect />
            </Form.Item>
          }

          <Form.Item
            name='text'
            label={flag===1?"模块名称":"菜单名称"}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='icon'
            label="ICON图标"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='path'
            label="PATH路由"
          >
            <Input />
          </Form.Item>

          {
            flag===1 &&
            <Form.Item
              name='component'
              label="组件名称"
            >
              <Input />
            </Form.Item>
          }
        </Form>
      </Modal>
    </div>
  )
}
