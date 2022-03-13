import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, Switch, Upload, Input, Button, message } from 'antd'
import QfQuill from './components/QfQuill'
import QfUpload from './components/QfUpload'
import './style.scss'

import { useAppDispatch } from '@/hooks'
import { checkArticleTitle, checkArticleAuthor, checkArticleImage } from '@/utils/validate'
import { updateArticle, infoArticle } from '@/store/reducers/article'

export default () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { id } = useParams()
  console.log('----id', id)

  useEffect(()=>{
    dispatch(infoArticle({id})).then(({payload})=>{
      // 把文章详情数据填充到Form表单上
      if (payload) form.setFieldsValue(payload)
    })
  }, [])
  const onFinish = (values) => {
    // console.log('提交', values)
    if (id) values['id'] = id
    dispatch(updateArticle(values)).then(res=>{
      if (res.payload) {
        message.success(`文章${id?'修改':'添加'}成功`, 1.5, ()=>{
          navigate(-1)
        })
      }
    })
  }
  return (
    <div className='qf-article-add'>
      <Form
        labelCol={{span:3}}
        wrapperCol={{span:8}}
        name="nest-messages"
        form={form}
        initialValues={{
          title:'',
          author: '',
          top: false,
          image:'',
          content: ''
        }}
        onFinish={onFinish}
        validateTrigger={['onBlur','onChange']}
      >
        <Form.Item
          name='title'
          label="文章标题"
          rules={[
            { required: true, message:'标题是必填字段' },
            { validator: checkArticleTitle, message:'标签只能6~20字符' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='author'
          label="作者"
          rules={[
            { required: true, message:'作者是必填字段' },
            { validator: checkArticleAuthor, message:'标签只能2~6字符' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='top'
          label="是否置顶"
          valuePropName='checked'
          rules={[
            { required: true, message:'置顶是必填字符' }
          ]}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="缩略图"
          name='image'
          rules={[
            { required: true, message:'请上传两缩略图' },
            { validator: checkArticleImage, message:'必须是两张图片' }
          ]}
        >
          {/* <QfUpload value={image2} onChange={(val)=>setImage(val)} /> */}
          <QfUpload />
        </Form.Item>

        <Form.Item
          name='content'
          wrapperCol={{offset:3, span:18}}
          style={{height:'330px'}}
        >
          <QfQuill />
        </Form.Item>

        <Form.Item wrapperCol={{offset:3}}>
          <Button type="primary" htmlType="submit">
            { id ? '修改' : '添加' }
          </Button>
        </Form.Item>
      </Form>


    </div>
  )
}
