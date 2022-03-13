import React from 'react';
import { useNavigate } from 'react-router-dom'

import { Form, Input, Button, Checkbox } from 'antd'
import './style.scss'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { login, getInfo } from '@/store/reducers/user'

// 封装自定义的验证规则
const vidatePassWord = (rule, value) => {
  console.log('rule', rule)
  console.log('value', value)
  if (value.length===6) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error(rule.message))
  }
}

export default () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // 登录流程
  const onFinish = (values:any) => {
    console.log('登录', values)
    dispatch(login(values)).then(res=>{
      console.log('登录成功', res)
      if (res.payload) {
        dispatch(getInfo({})).then(res=>{
          console.log('login res', res)
        })
      }
    })
  }

  return (
    <div className='qf-login'>
      <div className='wrap'>
        <Form
          name="basic"
          labelCol={{span:6}}
          wrapperCol={{span:16}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message:'用户名不能为空' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              { required: true, message: '密码不能为空', validateTrigger: 'onBlur' },
              { validator: vidatePassWord, message:'密码只能是666666', validateTrigger: 'onChange' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{offset:6,span:16}}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{offset:6,span:16}}
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
