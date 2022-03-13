// 状态提升：当两个组件之间需要共享一个状态（数据）时，我们的做法是把这个状态（变量）定义它们共同的最近的一个父组件中。

import React, { PureComponent } from 'react'

// 摄氏温度组件
const CelsiusTemper = props => {
  const { temper, onTemper } = props
  return (
    <div>
      <span>摄氏温度：</span>
      <input
        type="text"
        value={temper}
        onChange={ev=>onTemper(ev.target.value)}
      />
    </div>
  )
}

// 华氏温度组件
const FahrenheitTemper = props => {
  const { temper, onTemper } = props
  return (
    <div>
      <span>华氏温度：</span>
      <input
        type="text"
        value={temper*2}
        onChange={ev=>onTemper(Number(ev.target.value)/2)}
      />
    </div>
  )
}

export default class extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      temper: 0
    }
  }
  render () {
    const { temper } = this.state
    return (
      <div>
        <h2>学习状态提升</h2>
        <CelsiusTemper
          temper={temper}
          onTemper={temper=>this.setState({temper})}
        /><hr/>
        <FahrenheitTemper
          temper={temper}
          onTemper={temper=>this.setState({temper})}
        />
      </div>
    )
  }
}
