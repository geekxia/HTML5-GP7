
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

// 特别注意：如何区分element和fiber呢？
// element上没有link指针，它是孤立的，它纯粹的 {type,props}
// fiber是element添加了link指针后的结果，它会形成与其它fiber的链接关系
function createDom (fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type)

  // 遍历element.props上的非children属性，并将其添加到DOM上
  updateDom(dom, {}, fiber.props)

  // 没有遍历fiber.props.children，也没有执行DOM插入操作
  return dom
}

// 相当于你正在封装ReactDOM库（***）
// 入参：element是Fiber单元，container挂载的节点

// render(<App/>, document.getElementById('app'))
function render(element, container) {
  // 把root这个工作单元，设置成第一个工作单元（第一个Fiber单元）
  wipRoot = {
    dom: container,   // 当前element将要挂载的父节点，这相当于是vue.$el
    props: {
      children: [element]  // 这个element相当是<APP/>这个元素
    },
    alternate: currentRoot
    // wipRoot正在render那个根Fiber
    // currentRoot 是当前节点的旧Fiber
  }
  deletions = []
  nextUnitOfWork = wipRoot
  // 当第一个工作单元被设置完成时。其实此时，浏览器早已准备好了，浏览器要执行requestIdleCallback(workLoop)
}

// --------------------------------------------------------

let nextUnitOfWork = null   // 即将执行的下一个“工作单元”
let wipRoot = null          // 记录当前正在执行工作单元的root节点
let currentRoot = null      // 它指向上一次已经commit过的那颗“Fiber树”
let deletions = []          // 用于收集每次更新阶段中即将要删除的Fiber节点

function workLoop(dealine) {
  let shouldYield = false  // 当它为假时，表示浏览器中断了当前的工作
  while (nextUnitOfWork && !shouldYield) {
    console.log('render start')
    // 如果有下一个事儿(工作单元)，并且浏览没有中断当前工作
    // 如果浏览器没有中断当前工作，说明浏览器还是比较“空闲”的
    console.log('nextUnitOfWork', nextUnitOfWork)
    // 意思：执行当前的工作单元，执行完成后再返回一个新的工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    console.log('nextUnitOfWork', nextUnitOfWork)
    // 问题：这个while循环将一直工作，那什么时候能停下来了？
    // 当nextUnitOfWork为空时，说明没有任务了，停下来
    // 当浏览器主线程比较忙时，也要停下来，这个“停下来”是浏览器强制的
    shouldYield = dealine.timeRemaining() < 1  // 单位是：毫秒
  }
  // 什么时候该commit()提交更新真实DOM呢？
  if (!nextUnitOfWork && wipRoot) {
    console.log('commit start')
    commitRoot()
  }
  // 使用reqiuestIdleCallback()实现render的异步工作
  // 因为这个api有兼容性问题，所以react官方自己实现了scheduler调试
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

// 要想让requestIdleCallback()开始工作，我们需要给nextUnitOfWork第一个工作单元。由谁来执行工作呢？由performUnitOfWork执行工作，这个方法不仅仅是执行工作，还要能够返回下一个要执行的工作。
function performUnitOfWork(fiber) {
  // 判断是不是函数式组件
  const isFunctionComponent = fiber.type instanceof Function
  console.log('isFunctionComponent', isFunctionComponent)
  if (isFunctionComponent) {
    console.log('---function')
    updateFunctionComponent(fiber)
  } else {
    console.log('---host')
    updateHostComponent(fiber)
  }

  // 第三件事：根据Fiber工作流程原则，找到下一个工作单元并返回
  // 先孩子节点，如果有，直接返回；如果没有，进入下步
  if (fiber.child) return fiber.child
  // 找下一个兄弟（这个兄弟有可能是当前fiber的下一个兄弟，也可能是祖宗的下一个兄弟）
  let next = fiber
  while (next) {
    if (next.sibling) return next.sibling
    next = next.parent
  }
}

function commitRoot() {
  // 删除那些需要移除的Fiber所对应的DOM节点
  deletions.forEach(commitWork)
  // add nodes to dom
  // wipRoot在这里就相当是#app所对应的节点
  // wipRoot.child 这个代表就是<App/>这个Fiber节点
  commitWork(wipRoot.child)
  // 为了执行协调运算，在这里我们要记录这个被commit过的Fiber树
  currentRoot = wipRoot
  // 当DOM渲染更新完成时，清除掉wipRoot
  wipRoot = null
}

// 为了兼容考虑React组件的更新阶段，在这时我们不能“一刀切”地更新DOM。
// 要根据 effectTag 这个标记，来分门别类地渲染或更新DOM.
function commitWork(fiber) {
  if (!fiber) return

  // 向上寻找非函数式Fiber节点来挂载当前Fiber节点
  let parent = fiber.parent  // 这个parent节点可能是函数式的Fiber节点
  while (!parent.dom) {
    parent = parent.parent
  }
  const $el = parent.dom

  // 因为在下面用到了三种标记，这些标记是由“协调运算”添加的
  // 所以，如果下面不区分装载阶段和更新阶段，我们应该在commitWork之前已经完成了协调运算。

  // 新增了DOM节点
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    $el.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'DELETION') {
    // 删除Fiber节点时，也需要找到一个拥有dom的节点，而不是函数式的Fiber节点
    commitDeletion(fiber, $el)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
    // 如果oldFiber.effectTag='UPDATE',只是说明这个节点的属性有可能变了
    // 所以，这里我们进一步遍历fiber.props来找出最小变化差异点。
    // 这个udpateDom方法，用于对比当前fiber节点上props的变化
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }

  // 递归插入DOM节点
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitDeletion(fiber, $el) {
  if (fiber.dom) {
    // 删除非函数式的Fiber节点
    $el.removeChild(fiber.dom)
  } else {
    // 删除函数式组件的Fiber，向下寻找可移除的DOM节点
    commitDeletion(fiber.child, $el)
  }
}

// 协调运算（在装载阶段、更新阶段都执行）
function reconcileChildren(fiber, elements) {
  // 约定：element表示当前节点，oldFiber表示是element所对应的旧Fiber
  let index = 0
  // 此时这个oldFiber就是fiber所对应的旧Fiber树中的第一个子Fiber
  // console.log('reconcileChildren oldFiber', fiber)
  let oldFiber = fiber.alternate && fiber.alternate.child  // elements[0]
  // 如果fiber.alternate不存在，说明此时是装载阶段，所有孩子的标记都就是PLACEMENT

  let prevSibling = null  // 表示上一个兄弟节点
  // bug：如果循环没进去，就无法创建Fiber，也不能添加标记。所以commit就没有反应。
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index]
    // 说明：newFiber是即将为element创建的Fiber
    let newFiber = null
    // 判断当前element和oldFiber的type是否相同
    const sameType = (oldFiber && element && oldFiber.type === element.type)
    // 对比一：准备更新这个节点的属性
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        alternate: oldFiber,
        parent: fiber,
        effectTag: 'UPDATE'  // 这个标记是用于commit阶段的
      }
    }
    // 对比二：element是新增的节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        alternate: null,
        parent: fiber,
        effectTag: 'PLACEMENT'
      }
    }
    // 对比三：oldFiber被删除了
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      // 把即将要删除的oldFiber放在一个全局的数组中去
      deletions.push(oldFiber)
    }

    // 执行循环
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (index === 0) {
      fiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}

// 判断一个属性是不是事件属性
const isEvent = key => key.startsWith('on')
// 判断一个key是不是非children属性、非事件属性，
const isProperty = key => key !== 'children' && !isEvent(key)
// 判断一个属性，是不是新增的属性
const isNew = (prev, next) => key => prev[key] !== next[key]
// 判断一个属性，是不是被移除
const isGone = (prev, next) => key => !(key in next)
// 用于对比、更新当前dom节点的props
function updateDom(dom, prevProps, nextProps) {
  // 把新增的属性，更新到dom上
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
  // 把移除的属性，从dom上清除
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })
  // 把旧的事件处理器，从dom上解绑
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })
  // 把新的事件处理器，绑定到dom上
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })
}


function updateHostComponent(fiber) {
  console.log('---fiber', fiber)
  // 第一件事：把当前工作单元(Fiber单元)添加到真实的DOM中去
  if (!fiber.dom) fiber.dom = createDom(fiber)

  // 第二件事：遍历当前Fiber单元的孩子们，并给每一个孩子创建一个Fiber
  // element是什么时候变成有指针的Fiber的？答案，就在此刻。
  const elements = fiber.props.children
  // 协调运算，把孩子们从element变成fiber，添加标记给commit阶段使用
  console.log('elements', elements)
  reconcileChildren(fiber, elements)
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0
  // wipFiber.hooks = [{},{}]
  wipFiber.hooks = []  // 放的是num这个state所对应的hook数据
  // 如果是函数式组件，要调用它才能得到JSX（即HostComponent）
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

// 这个数据结构的设计，和真实React底层的那个Hooks数据结构有很大的出入
// 结论：这里只是模拟，以方便大家理解Hooks原理
let wipFiber = null
let hookIndex = null
// const [num, setNum] = useState(100)
// const [name, setName] = useState('周延')
function useState(initial) {
  // 每次有人调用useState时，我们先判断React底层是否已经存在这个hook，如果存在就取底层中缓存的state值返回给组件；如果不存在，我创建hook并将缓存在React的底层。
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
  // const hook = {state: 100, queue:[]}
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }
  const actions = oldHook ? oldHook.queue : []
  console.log('actions', actions)
  actions.forEach(action=>{
    console.log('action', action)
    console.log('new state', action(hook.state))
    if (typeof action === 'function') {
      hook.state = action(hook.state)
    } else {
      console.log('action type', typeof action)
    }

  })
  // 专门用于更新state变量，并设置第一个工作单元，以触发render阶段。。
  function setState(action) {
    // debugger
    console.log('setState', typeof action, action)
    console.log('hook.state', hook.state)
    hook.queue.push(action)  // 只是把更新state的方法放进队列，并没有调用
    // 还要触发“风吹草动”，那该怎么触发“更新阶段”？
    // 答案：设置第一个工作单元，这样requestIdleCallback()会自动工作
    console.log('wipFiber', wipFiber)
    console.log('wipRoot', wipRoot)
    console.log('currentRoot', currentRoot)
    // 触发更新。。
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }
  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}

const React = {
  createElement,
  render,
  useState
}
