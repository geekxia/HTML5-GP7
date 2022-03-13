import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const Header = props => {
  const { title, closable, onCancel } = props
  return (
    <div className='header'>
      { title }
      { (closable||true) && <span onClick={ev=>onCancel(ev)} className='close'>X</span> }
    </div>
  )
}

const Body = props => {
  return (
    <div className='body'>
    { props.children }
    </div>
  )
}

const Footer = props => {
  const { onOk, onCancel, footer } = props
  return (
    <div className='footer'>
    {
      footer || (
      <>
        <span className='default' onClick={ev=>onCancel(ev)}>取消</span>
        <span className='primary' onClick={ev=>onOk(ev)}>确定</span>
      </>
      )
    }
    </div>
  )
}

const Modal = props => {
  const { visable, onCancel } = props
  const cancelHandle = ev => {
    if (ev.target.dataset.self ) onCancel(ev)
  }
  return (
    <div
      className='qf-modal-layer'
      style={ {display:visable?'block':'none'} }
      data-self={true}
      onClick={ev=>cancelHandle(ev)}
    >
      <div className='qf-modal'>
        <Header {...props} />
        <Body {...props} />
        <Footer {...props} />
      </div>
    </div>
  )
}

// 为props添加数据类型验证
Modal.propTypes = {
  title: PropTypes.node, // ReactNode
  visable: PropTypes.bool,  // 布尔类型
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  closable: PropTypes.bool,
  footer: PropTypes.node,
  type: PropTypes.oneOf(['primary','danger','default'])
}

// 为props属性添加默认值
Modal.defaultProps = {
  title: '呵呵'
}

export default Modal
