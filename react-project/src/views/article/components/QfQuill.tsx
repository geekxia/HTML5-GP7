import React from 'react'
import ReactQuill from 'react-quill'

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': ['red','blue','green'] }, { 'background': ['red', 'green'] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
]

export default (props: any) => {
  const { value, onChange } = props
  return (
    <ReactQuill
      theme="snow"
      style={{height:'270px'}}
      modules={{ toolbar }}
      value={value}
      onChange={val=>onChange(val)}
    />
  )
}
