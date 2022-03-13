import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { Form, Input, Tree, Button, message } from 'antd'
import './style.scss'

import RoleSelect from './components/RoleSelect'
import MenuTree from './components/MenuTree'
import { addRole, listMenu, resetAdmin, infoRole, listRole } from '@/store/actions'

const { TextArea } = Input

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const { menuList, done, roleInfo, roleList, collapsed } = useSelector(state=>state.admin)
  const [form] = Form.useForm()
  const [role, setRole] = useState('')

  useEffect(()=>{
    if (done>0) {
      message.success('添加角色成功', 2, ()=>history.goBack())
    }
  }, [done])

  useEffect(()=>{
    // 当store没有roleList时，触发获取数据
    if (roleList.length===0) dispatch(listRole())
  }, [])

  useEffect(()=>{
    if (menuList.length===0) dispatch(listMenu())
    // 当组件销毁时，走store流程重置done
    return ()=>dispatch(resetAdmin())
  }, [])

  // 编辑页面的初始化调接口
  useEffect(()=>{
    if (id) dispatch(infoRole({role_id:id}))
    return () => dispatch(resetAdmin())
  }, [])

  // 在编辑时给表单添加初始值
  useEffect(()=>{
    if (roleInfo && roleInfo._id) {
      form.setFieldsValue(roleInfo)
    }
  }, [roleInfo])

  // 参考角色发生变化时
  const roleReferChange = ev => {
    console.log('role refer ev', ev)
    setRole(ev.role)
    const auths = ev.menus.split(';').filter(ele=>ele)
    form.setFieldsValue({auths})
  }

  const onFinish = () => {
    const values = form.getFieldsValue()
    console.log('提交', values)
    values.menus = values.auths.join(';')
    // 如果id存在，是编辑
    if (id) values.role_id = id
    dispatch(addRole(values))
  }

  return (
    <div className="qf-role-form">
      <Form
        labelCol={{span:3}}
        wrapperCol={{span:7}}
        name="nest-messages"
        form={form}
        onFinish={onFinish}>

        {/* value  onChange */}
        <Form.Item
          name='role_name'
          label="角色（中文）"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='role'
          label="角色（英文）"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='role_desc'
          label="角色描述"
        >
          <TextArea />
        </Form.Item>

        {
          !id && <Form.Item
            label="参考角色"
          >
            <RoleSelect value={role} onChange={ev=>roleReferChange(ev)} />
          </Form.Item>
        }

        <Form.Item
          label='权限'
          name='auths'
        >
          <MenuTree />
        </Form.Item>

      </Form>

      <div className='btn' style={{left:(collapsed?'80px':'200px')}}>
        <Button type="primary" onClick={onFinish}>
          { id ? "修改" : "添加" }
        </Button>
      </div>
    </div>
  )
}
