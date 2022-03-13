import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import './style.scss'
import { login } from '@/store/actions'

export default () => {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const onFinish = values => {
    console.log('登录', values)
    dispatch(login(values))
    // history.replace('/dashboard')
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
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
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
