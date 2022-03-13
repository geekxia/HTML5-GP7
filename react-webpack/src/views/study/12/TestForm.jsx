// 表单绑定：除了文件上传以外，都要使用受控表单。

// 1、两类表单
  // 受控表单，表单/类表单的value或checked由state控制着。
  // 非受控表单，表单/类表单的value或checked与state完全无关。

  // 原则：除了文件上传以外，所有表单都必须是受控表单。

  // 对于普通文本表单、select表单，用value属性来受控，用onChange取值。
  // 对于radio/checkbox表单，用checked属性来受控，用onChange取值。
  // 对于自定义的“类表单”，我们建议用自定义属性value来受控，用自定义onChange取值。

// 2、表单的单向绑定
  // 意思是在React中表单的取值操作必须手动完成。

  // 最佳实践：当页面中表单特别多时，我们只封装一个change handler来取所有表单的值。也就是对change handler方法的复用。复用的方式有很多，可以自定义dataset、自定义事件传参来实现。

import React from 'react'

const Radio = ({value,onChange}) => {
  const list = [
    {id:1,value:'man',label:'男'},
    {id:2,value:'female',label:'女'},
    {id:3,value:'unknow',label:'保密'}
  ]
  return (
    <>
      <span>性别：</span>
      {
        list.map(ele=>(
          <span key={ele.id}>
            <input
              type="radio"
              checked={value===ele.value}
              value={ele.value}
              data-key='gender'
              onChange={ev=>onChange(ev)}
            />
            <span>{ele.label}</span>
          </span>
        ))
      }
    </>
  )
}

const Checkbox = ({value,onChange}) => {
  const list = [
    {id:1,value:'football',label:'足球'},
    {id:2,value:'basketball',label:'蓝球'},
    {id:3,value:'coding',label:'编程'},
    {id:4,value:'book',label:'写书'},
    {id:5,value:'running',label:'跑步'}
  ]
  return (
    <>
      <span>爱好：</span>
      {
        list.map(ele=>(
          <span key={ele.id}>
            <input
              type="checkbox"
              checked={value.includes(ele.value)}
              data-key='fav'
              value={ele.value}
              onChange={ev=>onChange(ev)}
            />
            <span>{ele.label}</span>
          </span>
        ))
      }
    </>
  )
}

const LevelSelect = ({value, onChange}) => {
  const list = [
    {id:1,value:'gaozhong',label:'高中'},
    {id:2,value:'dazhuan',label:'大专'},
    {id:3,value:'benke',label:'本科'}
  ]
  return (
    <>
      <span>学历：</span>
      <select
        value={value}
        data-key='level'
        onChange={ev=>onChange(ev)}>
      {
        list.map(ele=>(
          <option key={ele.id} value={ele.value}>{ele.label}</option>
        ))
      }
      </select>
    </>
  )
}


let addr = ''
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: '111',
      nickname: '',
      desc: '',
      level: '',
      gender: '',
      fav: ['book']
    }
  }
  submit1 () {
    const data = {
      name: document.getElementById('name').value,
      age: this.refs.age.value,
      addr: addr,
      mobile: this.state.mobile,
      mobile2: this.state.mobile2
    }
    console.log('提交', data)
  }

  change (ev) {
    const k = ev.target.dataset.key
    console.log('ev value', ev.target.value)
    console.log('ev checked', ev.target.checked)
    if (k==='fav') {
      const checked = ev.target.checked
      const value = ev.target.value
      this.setState(state=>{
        const newFav = checked ? [...state.fav, value] : state.fav.filter(ele=>ele!==value)
        return { [k]: newFav }
      })
    } else {
      // 手动取出表单最新值，更新到state，进一步触发视图的更新
      this.setState({[k]:ev.target.value})
    }
  }
  submit2 () {
    const data = {
      nickname: this.state.nickname,
      desc: this.state.desc,
      level: this.state.level,
      gender: this.state.gender,
      fav: this.state.fav
    }
    console.log('提交', data)
  }
  render () {
    const { mobile, nickname, desc, level, gender, fav } = this.state
    return (
      <div>
        <h1>学习表单绑定</h1>

        <div className='not-control'>

          <span>姓名：</span>
          <input id='name' type="text"/>
          <br/>

          <span>年龄：</span>
          <input ref='age' type="number" />
          <br/>

          <span>地址：</span>
          <input type="text" onInput={ev=>addr=ev.target.value} />
          <br/>

          <span>手机：</span>
          {/*<input type="text" onInput={ev=>this.setState({mobile:ev.target.value})}/>*/}
          {/*<input type="text" onInput={ev=>this.state.mobile=ev.target.value}/>*/}
          <input
            type="text"
            defaultValue={mobile}
            onInput={ev=>this.setState({mobile:ev.target.value})}
          />
          <br/>
          <span>头像：</span>
          <input type="file"/>
          <br/>

          <button onClick={()=>this.submit1()}>提交非受控表单</button>
        </div>

        <div className='control'>
          <span>艺名：</span>
          <input
            type="text"
            value={nickname}
            data-key='nickname'
            onChange={ev=>this.change(ev)} />
          <br/>
          <span>简介：</span>
          <textarea
            cols="30"
            rows="3"
            value={desc}
            data-key='desc'
            onChange={ev=>this.change(ev)} />
          <br/>

          <LevelSelect value={level} onChange={ev=>this.change(ev)} />
          <br/>
          <Radio value={gender} onChange={ev=>this.change(ev)} />
          <br/>
          <Checkbox value={fav} onChange={ev=>this.change(ev)} />
          <br/>

          <button onClick={()=>this.submit2()}>提交受控表单</button>
        </div>
      </div>
    )
  }
}
