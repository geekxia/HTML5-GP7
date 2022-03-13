// 组合：它是React官方特别推荐的一种组件化的设计方案。

// 意义：组合是React封装组件的基础思想，背后的语法基础：props children / render props。

// 封装组件的一般思路（观察--封装--使用）
// 1、思考当前产品需要复用的一种类型的组件，由哪几个部分组件？（抽象、拆解）
  // 把多个有所差异的需求，抽象成一个模板（组件）
  // 进一步把这个模板（组件）拆解多个不同“子部分”
// 2、把每个“子部分”封装子组件，把每个子组件的多种可能通过props进行控制。
// 3、把这些子组件，组合成多种不同的结果。（3种header*2种boyd*2种footer=12种结果）

// 简单理解继承实现组件的复用？
// class Modal extends PureComponent {}
// class DefaultHeaderModel extends Modal {}
// class MiniHeaderModal extends Modal {}
// class DefaultFooterDefaultHeaderModal extends DefaultHeaderModel {}
// class CustomFooterMiniHeaderModal extends MiniHeaderModal {}


import React, { PureComponent } from 'react'
import Modal from './modal'

export default class extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }
  render () {
    const { show } = this.state
    return (
      <div>
        <h2>测试弹框组件</h2>
        <button onClick={()=>this.setState({show:true})}>弹框</button>
        <Modal
          title={'我的标题'}
          visable={show}
          onCancel={()=>this.setState({show:false})}
          onOk={()=>this.setState({show:false})}
          footer={null}
        >
          <h3>表单</h3>
        </Modal>
      </div>
    )
  }
}
