// 用生命周期的线索封装自已的Vue
// 1、实现了响应式原理（结合“生命周期图+响应式原理图”再次深入去理解）
// 2、实现了一个非常粗糙的Vue编译器（DocumentFragment、DOM方法）

// 扩展：进一步研究响应式数据递归劫持、递归编译DOM的嵌套结构、如何实现数组的响应式劫持、如何实现生命周期、如何解决指令中表达问题、如何实现计算属性和监听器、如何实现$destroy第四阶段……

// 代码思路：先轮廓（基于你对框架的理解）、后装修（测试驱动开发）

(function (global, factory) {
  global.Vue = factory()
}(this, function () {

  function callHook(lifecycle) {
    console.log('--------', lifecycle)
  }

  // 功能：把data选项上的数据放在vue实例对象上
  // 因为proxy只是把data中的数据放在this，所以不需要递归
  function proxy(vm, data) {
    vm.$data = data
    Object.keys(data).forEach(key=>{
      Object.defineProperty(vm, key, {
        get () {
          // console.log(`你正在访${key}这个变量`)
          return data[key]
        },
        set (newVal) {
          // console.log(`你正在修改${key}这个变量`)
          data[key] = newVal
        }
      })
    })
  }

  function initMixin(Vue) {
    // 这个_init是vue生命周期第一阶段的核心逻辑
    Vue.prototype._init = function(options) {
      callHook('beforeCreate')

      // 把data选项proxy一遍，放在this上
      proxy(this, options.data)
      // 使用observe方法劫持data数据，实现真正响应式，为touch做准备
      observe(this.$data)
      // 虽然响应式依赖的流程代码已实现，请问到这时，依赖有收集吗？
      // 答案，此时此刻还没执行依赖收集，原因是指令和响应式变量还没有进行第一次touch

      callHook('created')

      // 准备进入第二阶段 this.$mount() mountComponent
      // 注意：在这里我们不写虚拟DOM的逻辑(_render)，只关心更新(_update)
      if (options.el) {
        this._update(options.el)
      }
    }
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (el) {
      callHook('beforeMount')
      new Compiler(this, el)
      callHook('mounted')
    }
  }

  function Vue(options) {
    // console.log('基于选项的Vue', options)
    var { data } = options
    data = (typeof data === 'function') ? data() : data
    this.$options = { ...options, data }
    this._init(this.$options)
  }
  initMixin(Vue)
  lifecycleMixin(Vue)

  // 功能：真正地实现响应式数据劫持
  function observe (data) {
    const ob = new Observer(data)
    return ob
  }
  // 功能：这是真正实现响应的逻辑（依赖收集、触发更新）
  function defineReactive(data, key, value) {
    // 给每个响应式变量，都创建一个独立的dep集合来存储它所对应的所有wathcer
    let dep = new Dep()
    Object.defineProperty(data, key, {
      // 触发依赖收集，要收集当前这个响应式变量所对应的watcher
      // 触发dep收集所有watcher
      get () {
        if (Dep.target) {
          dep.append()
          // console.log('collect success')
        }
        // 这个return不要用data[key]，因为这是一个get操作，这会触发反复get
        return value
      },
      // 触发dep遍历所有watcher并调用
      set (newVal) {
        value = newVal
        dep.notify()
      }
    })
    // 递归劫持响应式数据，为什么在这里调用 observe(value) 是递归？
    if (typeof value === 'object') observe(value)
  }

  class Observer {
    constructor(data) {
      console.log('observer constructor data', data)
      this.data = data
      // 添加 __ob__的标识
      this.walk(data)
    }
    walk (data) {
      // 对data选项上的第一层数据进行劫持，目前还没有考虑到第二层
      // 结论：在这里数据劫持的递归问题
      Object.keys(data).forEach(key=>{
        // 用递归来实现响应式劫持
        defineReactive(data, key, data[key])
      })
    }
  }

  // 你可把Dep理解成消息系统（数据结构）
  // 消息系统、订阅与发布
  class Dep {
    // 每一个响应式变量都需要一个独立的dep实例
    constructor() {
      this.subs = []  // 收集watcher集合
    }
    static target = null
    addSub (watcher) {
      this.subs.push(watcher)
      // console.log('当前响应式变量对应的watcher', this.subs)
    }
    append () {
      // 用于收集watcher，技巧：把watcher实例放在Dep.target上
      if (Dep.target) this.addSub(Dep.target)
    }
    notify () {
      // 遍历this.subs，逐个调用watcher的更新方法、进一步更新视图
      this.subs.forEach(watcher=>watcher.update())
    }
  }

  // 提问：defineReactive要收集watcher，那么watcher从哪里来呢？
  // 答案：当“touch”时（指令和响应式变量第一次接触时）创建watcher实例
  class Watcher {
    // wathcer实例是用于更新视图节点
    // 什么样的视图节点才需要更新呢？就是指令所对应的节点才有可能发生更新
    // vm - 表示组件实例
    // key - 这个watcher隶属于哪个响应式变量的？
    // cb - 用于更新指定节点的DOM方法
    constructor(vm, key, cb) {
      this.vm = vm
      this.key = key
      this.cb = cb
      // 只有使用指令来get声明式变量才执行依赖收集
      // 当有人new Watcher()时，我就把当前watcher放在Dep.target上
      Dep.target = this
      this.cb()  // 第一次更新DOM，第一次touch就发生了
      // 当依赖收集完成，避免其它的get操作也收集依赖
      Dep.target = null
    }
    update () {
      this.cb()  // 在更新阶段来更新视图
    }
  }

  // 模拟实现一个Vue-Compiler编译器（处理指令、响应式变量、methods方法）
  class Compiler {
    constructor(vm, el) {
      console.log('Compiler已经准备到位', vm, el)
      this.vm = vm

      // 1、找到当前组件要挂载的节点，$el就是当前组件要挂载的节点
      vm.$el = document.querySelector(el)

      // 2、找到当前组件的视图模板，并用Fragment进行描述
      // 问题：为什么要使用Fragment？目的是提高DOM操作性能、同时避免回流问题
      const fragment = this.createFragment(vm.$el)

      // 3、在碎片的基础上，解析编译视图模板的指令和表达式
      this.compile(fragment)

      // 4、把第3步中编译的碎片结果，append到$el中，即完成了真实渲染
      vm.$el.appendChild(fragment)
    }
    // 用于创建视图模板所对应的“碎片描述”
    createFragment($el) {
      // 创建一个空的DOM碎片(它保存内存中)
      // 我要用这个碎片来描述将要追加到$el中的视图模板
      const fragment = document.createDocumentFragment()
      // 判断$el是否还有直接子元素，如果有，把它追加到fragment中
      while ($el.firstChild) {
        fragment.appendChild($el.firstChild)
      }
      return fragment
    }
    // 用于编译、解析碎片中的指令和表达式等等
    compile (fragment) {
      const nodes = Array.from(fragment.childNodes)
      console.log('nodes', nodes)
      // 如果是text节点、comment节点，忽略掉
      // 只考虑nodeType=1的元素节点
      nodes.forEach(node => {
        if (node.nodeType===1) {
          this.compileNode(node)
          // 如果当前节点还有子节点，也要考虑，所以要递归编译
          if (node.childNodes) this.compile(node)
        }
      })
    }
    compileNode (node) {
      // 拿到每个node节点的“属性列表”
      // 为什么需要拿到“属性列表”？因为我们要处理指令！
      const attrs = Array.from(node.attributes)
      const vm = this.vm
      // 遍历当前node节点的每个属性，要对指令进行处理
      attrs.forEach(attr => {
        const { name, value } = attr
        console.log('attr', attr, name, value)
        const { dirUtils } = Compiler
        // 对所有“指令属性”进行处理

        if (name.startsWith('v-text')) {
          dirUtils['text'](vm, node, attr)
        } else if (name.startsWith('v-bind') || name.startsWith(':')) {
          dirUtils['bind'](vm, node, attr)
        } else if (name.startsWith('v-on') || name.startsWith('@')) {
          dirUtils['on'](vm, node, attr)
        } else if (name.startsWith('v-model')) {
          console.log('---m')
          dirUtils['model'](vm, node, attr)
        }
      })
    }

    // 策略模式
    static dirUtils = {
      // node是节点，attr是node中的一个属性
      // 功能：用于处理指令所需要的所有参数，及上下文的取值问题
      init (vm, node, attr) {
        // 字符串 name  value 处理逻辑
        const { name, value } = attr
        // 当value是表达式，怎么办？
        return { name, value }
      },
      text (vm, node, attr) {
        // 这就是第一次touch
        const { value } = this.init(vm, node, attr)
        new Watcher(this.vm, value, function() {
          // 进一步编译器中如何处理各种js表达式的编译？
          // 在这里，仅以 v-text='user.age' 这种表达式做处理
          const val = eval(`vm.${value}`)
          // console.log('----user.age', val)
          node.innerText = val  // get
        })
        node.removeAttribute(name)
      },
      bind (vm, node, attr) {
        // console.log('实现v-bind', name, value)
        const { value, name } = this.init(vm, node, attr)
        new Watcher(vm, value, function() {
          const attrName = name.split(':')[1]
          switch (attrName) {
            case 'value':
              node.value = vm[value]
              break
            case 'class':
              break
            case 'style':
              break
            default:
              node.setAttribute(attrName, vm[value])
          }
        })
        node.removeAttribute(name)
      },
      on (vm, node, attr) {
        // console.log('实现v-on', name, value)
        const { name, value } = this.init(vm, node, attr)
        const eventName = name.startsWith('@') ? name.slice(1) : name.slice(5)
        console.log('---', eventName)
        node.addEventListener(eventName, function (ev) {
          // 改变一个this指向，让methods方法中的this指向当前组件实例
          vm.$options.methods[value].call(vm, ev)
        }, false)
      },
      model (vm, node, attr) {
        // 替用户实现表单的“双向绑定”
        const { name, value } = this.init(vm, node, attr)
        console.log('-model', vm, node, attr)
        node.addEventListener('input', function (ev) {
          vm[value] = ev.target.value  // set
        }, false)
        // 相当于是v-bind:value的功能
        new Watcher(vm, value, ()=>node.value=vm[value])
      }
    }
  }

  return Vue
}))
