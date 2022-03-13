import React, { useState, useEffect, memo } from 'react'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useAppSelector } from '@/hooks'

// 用于拼接图片的url
const getImage = fileList => {
  return fileList.reduce((prev,next)=>{
    if (next.status==='done') {
      return prev+`;${next.response.data.img}`
    } else {
      return prev+`;${next.thumbUrl.split('9999')[1]}`
    }
  }, '')
}

// memo()是高阶组件，和类组件中的PureComponent的功能类似
// memo()只能用于函数式组件
export default memo((props:any) => {
  const {value, onChange} = props
  const { token } = useAppSelector(state=>state.user)
  // 用于Upload组件的受控
  const [fileList, setFileList] = useState<any>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  // 用于图片初始化显示
  useEffect(()=>{
    if (value && !loaded) {
      const result = value.split(';').filter(ele=>ele).map(ele=>({
        thumbUrl: 'http://localhost:9999'+ele
      }))
      setFileList(result)
      setLoaded(true)
    }
  }, [value, loaded])

  const check = file => {
    if (file.size > 204800) {
      message.error('图片不能超过2M')
      return false
    }
    return true
  }

  const change = ({file, fileList}) => {
    console.log('file', file)
    console.log('filelist', fileList)
    setFileList(fileList)  // 为了触发三次onChange()

    if (file.status==='done' && file.response && file.response.err===0) {
      // 这条逻辑：表示当图片上传成功时
      const image = getImage(fileList)
      onChange(image)
    } else if (file.status==='removed') {
      // 这条逻辑：表示当删除图片成功时
      const image = getImage(fileList)
      onChange(image)
    }
  }

  return (
    <ImgCrop rotate>
      <Upload
        action="http://localhost:8080/api/v2/article/upload"
        name='img'
        headers={{Authorization:token}}
        listType="picture-card"
        maxCount={2}
        fileList={fileList}
        onChange={change}
        beforeUpload={check}
      >
        {fileList.length<2 && '+ Upload'}
      </Upload>
    </ImgCrop>
  )
}
)
