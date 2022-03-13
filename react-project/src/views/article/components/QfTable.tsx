import React, { useState, useMemo, useEffect } from 'react'
import { Table, Button, Row, Col, Dropdown, Menu } from 'antd'
import { PlusOutlined, ReloadOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import './style.scss'

import { useAppDispatch } from '@/hooks'

import data from '../data'

interface Props {
  title: string,
  request: any,
  query: object,
  columns: any,
  buttons?: any,
  global?: object,
  skipTo?: ()=>void,
  [propName:string]: any
}

const sizes = [
  { value: 'default', label: '默认' },
  { value: 'middle', label: '中等' },
  { value: 'small', label: '紧凑' }
]

const TableTitle = props => {
  const { title, skipTo, size, onChange } = props

  return (
    <Row>
      <Col span={4}>{title}</Col>
      <Col offset={12} span={8} className='title-btns'>
        <Button type='primary' onClick={skipTo} icon={<PlusOutlined />}>新增</Button>
        <ReloadOutlined />
        <Dropdown
          overlay={
            <Menu>
              {
                sizes.map(ele=>(
                  <Menu.Item
                    key={ele.value}
                    onClick={()=>onChange(ele.value)}>
                    <div
                      style={{color:size===ele.value?'blue':'black'}}>
                      { ele.label }
                    </div>
                  </Menu.Item>
                ))
              }
            </Menu>
          }
          placement="bottomLeft">
          <ColumnHeightOutlined />
        </Dropdown>
        <SettingOutlined />
      </Col>
    </Row>
  )
}

export default (props:Props) => {
  const { columns, title, buttons, query, request } = props
  const dispatch = useAppDispatch()
  // 设置表格大小的size
  const [size, setSize] = useState<any>('default')
  const [list, setList] = useState<Article[]>([])
  const [total, setTotal] = useState<number>(0)
  const [params, setParams] = useState<any>({size:2,page:1})

  useEffect(()=>{
    dispatch(request({...query,...params})).then(({payload})=>{
      if (payload) {
        setList(payload.list)
        setTotal(payload.total)
      }
    })
  }, [query, params])

  useEffect(()=>{
    setParams({...params,page:1})
  }, [query])

  const cols:any[] = useMemo(()=>(
    columns.map((ele,idx)=>{
      if (idx<columns.length-1) {
        let col = {
          title: ele[0],
          align: 'center',
          dataIndex: ele[1],
        }
        // 接收用户给的自定义的render()
        if (ele[2]) {
          col['render'] = (text,row,idx)=>ele[2](text,row,idx)
        }
        console.log('ele ----', ele)
        return col
      } else {
        return ({
          title: '操作',
          align: 'center',
          dataIndex: 'handle',
          render: (text, row)=>{
            return ele.map((ele,idx)=>(
              <Button
                key={idx}
                type='primary'
                danger={ele[2]&&ele[2].danger}
                size='small'
                style={{marginLeft:'10px'}}
                onClick={()=>ele[1](row)}>
                {ele[0]}
              </Button>
            ))
          }
        })
      }
    })
  ), [])
  return (
    <div className='qf-table'>
      <Table
        rowSelection={{type: 'checkbox'}}
        columns={cols}
        size={size}
        rowKey='_id'
        dataSource={list}
        title={()=>(
          <TableTitle
            {...props}
            size={size}
            onChange={val=>setSize(val)}
          />
        )}
        footer={()=>{
          return buttons.map((ele,idx)=>(
            <Button
              key={idx}
              style={{margin:'5px'}}
              type='primary'
              danger={ele[2]&&ele[2].danger}
              size={size}
              onClick={ele[1]}>
              {ele[0]}
            </Button>
          ))
        }}
        pagination={{
          defaultPageSize: 2,
          total,
          size,
          pageSize: params.size,
          current: params.page,
          pageSizeOptions: ['2','5','10'],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => (`总共${total}条`),
          onChange: (page,size)=>setParams({page,size})
        }}
      />
    </div>
  )
}
