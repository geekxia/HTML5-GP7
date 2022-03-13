
// return Fiber基础单元 = { type, props: { children } }
// type 表示当前节点的HTML元素名，也有可能是'TEXT-ELEMENT'
// props 表示当前节点的jsx属性，还包括一个特殊属性children
function createElement(type, props, ...children) {
  // 返回一个Fiber单元
  return {
    type,
    props: {
      ...props,
      children: children.map(ele=>(typeof ele==='object') ? ele : createTextElement(ele))
    }
  }
}

// 文本Fiber
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}


function isProperty (key) {
  return key !== 'children'
}

function render (element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type)

  // 遍历element.props上的非children属性，并将其添加到DOM上
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(attr=>dom[attr]=element.props[attr])

  element.props.children.forEach(child=>{
    render(child, dom)
  })

  container.appendChild(dom)
}

const React = {
  createElement,
  render
}
