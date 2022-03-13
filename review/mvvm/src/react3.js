
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
      ? document.createTextNode(fiber.props.nodeValue)
      : document.createElement(fiber.type)

  // 遍历element.props上的非children属性，并将其添加到DOM上
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(attr=>dom[attr]=fiber.props[attr])

  // 没有遍历fiber.props.children，也没有执行DOM插入操作
  return dom
}

// 相当于你正在封装ReactDOM库（***）
// 入参：element是Fiber单元，container挂载的节点
// 判断一个key是不是非children属性，
function isProperty (key) {
  return key !== 'children'
}

// render(<App/>, document.getElementById('app'))
function render(element, container) {
  // 把root这个工作单元，设置成第一个工作单元（第一个Fiber单元）
  wipRoot = {
    dom: container,   // 当前element将要挂载的父节点，这相当于是vue.$el
    props: {
      children: [element]  // 这个element相当是<APP/>这个元素
    }
  }
  nextUnitOfWork = wipRoot
  // 当第一个工作单元被设置完成时。其实此时，浏览器早已准备好了，浏览器要执行requestIdleCallback(workLoop)
}

// --------------------------------------------------------

let nextUnitOfWork = null   // 即将执行的下一个“工作单元”
let wipRoot = null          // 记录当前正在执行工作单元的root节点

function workLoop(dealine) {
  let shouldYield = false  // 当它为假时，表示浏览器中断了当前的工作
  while (nextUnitOfWork && !shouldYield) {
    // 如果有下一个事儿(工作单元)，并且浏览没有中断当前工作
    // 如果浏览器没有中断当前工作，说明浏览器还是比较“空闲”的

    // 意思：执行当前的工作单元，执行完成后再返回一个新的工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 问题：这个while循环将一直工作，那什么时候能停下来了？
    // 当nextUnitOfWork为空时，说明没有任务了，停下来
    // 当浏览器主线程比较忙时，也要停下来，这个“停下来”是浏览器强制的
    shouldYield = dealine.timeRemaining() < 1  // 单位是：毫秒
  }
  // 什么时候该commit()提交更新真实DOM呢？
  if (!nextUnitOfWork && wipRoot) commitRoot()
  // 使用reqiuestIdleCallback()实现render的异步工作
  // 因为这个api有兼容性问题，所以react官方自己实现了scheduler调试
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

// 要想让requestIdleCallback()开始工作，我们需要给nextUnitOfWork第一个工作单元。由谁来执行工作呢？由performUnitOfWork执行工作，这个方法不仅仅是执行工作，还要能够返回下一个要执行的工作。
function performUnitOfWork(fiber) {
  // 第一件事：把当前工作单元(Fiber单元)添加到真实的DOM中去
  if (!fiber.dom) fiber.dom = createDom(fiber)

  // 因为要分阶段了，所以这个地方，就不再做DOM的事儿。把这个事儿留着，给commit阶段来做。
  // if (fiber.parent) fiber.parent.dom.appendChild(fiber.dom)  // ？？？

  // 第二件事：遍历当前Fiber单元的孩子们，并给每一个孩子创建一个Fiber
  // element是什么时候变成有指针的Fiber的？答案，就在此刻。
  const elements = fiber.props.children
  let index = 0  // 用于while循环
  let prevSibling = null  // 上一个兄弟节点
  while (index < elements.length) {
    let element = elements[index]
    // 给循环中的这个element添加指针、dom，将其变成真正意义的Fiber单元
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,  // ? 你添加了parent指针，请求sibling、child指针在哪里？
      dom: null
    }
    if (index === 0) {
      // 当循环第一个子节点时，那么这个子节点其实就是当前fiber的child
      fiber.child = newFiber
    } else {
      // 当循环第二个、第三个。。。子节点时，把上一个节点的sibling指向当前被循环的这个节点
      prevSibling.sibling = newFiber
    }
    // 循环第一个元素时，prevSibling等于null，继续循环时，prevSibling就等于上一次循环那个节点。
    prevSibling = newFiber
    // 不断地循环
    index++
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
  // add nodes to dom
  // wipRoot在这里就相当是#app所对应的节点
  // wipRoot.child 这个代表就是<App/>这个Fiber节点
  commitWork(wipRoot.child)
  // 当DOM渲染更新完成时，清除掉wipRoot
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) return
  const $el = fiber.parent.dom
  $el.appendChild(fiber.dom)
  // 递归插入DOM节点
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
