# Vue3的简单

- vue3 对比 vue2 有哪些区别?
- vue3 大约2020年年底发布..

# 环境搭建

- 创建项目的两种方式
  - 使用@vue/cli创建(选择vue3), 背后是webpack.
  - 使用vite创建项目, 背后vite.

# 组件的编写方式

- [最佳实践]使用.vue文件, <script setup>编写组件.
- [最佳实践]使用.jsx/.tsx文件, 使用defineComponent编写JXS语法的组件.
- 在vue3中, 可以正常支持 vue2的组件定义方式(不用setup)
- 使用.vue文件, 把 setup当作选项来使用, export default { setup, methods }
- 使用.vue文件, 使用 defineComponent() 来编写组件.
- 使用.js/.ts文件, 使用 h 函数来编写组件.

# 为什么要使用setup组合?

- 原因: vue3中新增的setup, 目的是为了解决vue2中"数据和业务逻辑不分离"的问题.
- vue3中使用setup是如何解决的呢?
  - 第1步: 用setup组合API替换vue2中的data/computed/watch/methods/...
  - 第2步: 把setup中相关联的功能封装成一个独立可维护的hooks.


# vue3组合API

- ref
  - 作用: 一般用于定义基本数据类型, String / Boolean / Number
  - 背后: ref 的背后,是使用 reactive 来实现的响应式.
  - 语法: const x = ref(100)
  - 访问: 在setup中使用 .value来访问.
- isRef
  - 作用: 检查值是否为一个 ref 对象.
  - 语法: const bol = isRef(x)
- unref
  - 作用: 用于返回一个值, 如果访问的ref变量,就返回其.value值, 如果不是ref变量,就直接返回.
  - 语法: const x = unref(y)
- customRef
  - 作用: 自定义ref对象, 把ref对象改写成get/set, 进一步可以为它们添加track/trigger.
  - 参考官网的示例.

- toRef
  - 作用: 把一个reactive对象中的某个属性变成ref变量.
  - 语法: const x = toRef(reactive(obj), 'key')  // x.value
- toRefs
  - 作用: 把一个reactive响应式对象变成ref变量.
  - 语法: const obj1 = toRefs(reactive(obj))
  - 应用: 在子组件中接收父组件传递过来的props时, 使用toRefs把它变成响应式.

- shallowRef
  - 作用: 对复杂层级的对象,只将其第一层变成ref响应. (性能优化)
  - 语法: const x = shallowRef({a:{b:{c:1}},d:2}) 只有a和d变化才会自动更新.
- triggerRef
  - 作用: 强制更新一个shallowRef对象的渲染.
  - 语法: triggerRef(shallowRef对象)

- reactive
  - 作用: 定义响应式变量, 一般用于定义引用数据类型. 如果是基本数据类型,建议使用ref来定义.
  - 语法: const arr = reactive([])

- readonly
  - 作用: 把一个对象,变成只读的.
  - 语法: const rs = reactive(ref对象|reactive对象|普通对象)
- isProxy
  - 作用: 判断一个变量是不是readonly或reactive的.
- isReactive
  - 作用: 判断一变量是不是reactive的.
- isReadonly
  - 作用: 判断一个变量是不是只读的.
- toRaw
  - 作用: 得到返回reactive变量或readonly变量的"原始对象".
  - 语法: const raw = toRaw(reactive变量)
  - 疑问: reactive(obj) 和 obj 之间是浅拷贝的关系 ?
- markRaw
  - 作用: 把一个普通对象标记成"永久原始", 从此将无法再变成proxy了.
  - 语法: const raw = markRaw({a,b})
- shallowReactive
  - 作用: 定义一个reactive变量,只对它的第一层进行Proxy, 所以只有第一层变化时视图才更新.
  - 语法: const obj = shallowReactive({a:{b:9}})
- shallowReadonly
  - 作用: 定义一个reactive变量,只有第一层是只读的.
  - 语法: const obj = shallowReadonly({a:{b:9}})

- watchEffect/watchPostEffect/watchSyncEffect
  - 作用: 相当于是react中的useEffect()
  - 语法: const stop = watchEffect(fn)
- computed
  - 作用: 对响应式变量进行缓存计算.
  - 语法: const c = computed(fn/{get,set})
- 生命周期的变化
  - 选项式的beforeCreate/created被setup替代了.
  - 选项式的beforeDestroy/destroyed换成了beforeUnmount/unmounted
  - 新增了两个选项式的生命周期renderTracked/renderTriggered,它们只在开发环境有用,仅用于调试.
  - 在使用setup组合时,不建议使用选项式的生命周期,建议使用 on* 系列hooks生命周期.
- provide/inject
  - 作用: 在组件树中自上而下地传递数据.
  - 语法: provide('key', value)
  - 语法: const value = inject('key', '默认值')
- getCurrentInstance
  - 作用: 在setup或生命周期中访问 app实例
  - 语法: const app = getCurrentInstance()

- Vue3.0开发的最佳实践:
  - 只使用setup, 不要再使用vue的选项了
  - 有必要封装hooks时,建议把功能封装成hooks,以便于代码的可维护性.
  - 能用vite就尽量使用vite, 能用ts就是尽量使用ts.

# vue-router(v4)

- 注意：在vue3环境中，必须要使用vue-router(v4)
- 创建router，使用createRouter()
- 指定路由模式，使用history属性：createWebHashHistory/createWebHistory()
- 路由注册，在mian.js中 app.use(router)
- 如果当前项目严格使用组合式API进行开发，必须使用useRoute、userRouter...
- <router-link>已经没有tag属性的，用custom和插槽实现自定义。
- <router-view>新增了"插槽"功能，极其强大，参见路由中的伪代码，它在实现keep-alive和transition动画将变得更简单，还可以Suspense实现Loading。
- 新增了几个组合API：useRoute/useRouter/useLink。
- 查询vue-router(v3)和vue-router(v4)的变化：https://next.router.vuejs.org/zh/guide/migration/index.html

# vuex(v4)

- 注意：在vue3环境中，必须要使用vuex(4)
- 使用vuex数据时，哪怕是在setup中，也要使用computed来访问状态管理中的数据，否则数据不响应。

# vue(v3)的UI组件库

- 在vue3环境中，一定找支持vue3的组件库。那些vue2的组件库是无法使用的。
- 以and-design-vue(v2)为例进行使用
  - cnpm i ant-design-vue@next -S
  - cnpm i vite-plugin-components -D
  - 在vite.config.js中配置组件的按需加载。
  - 在index.html引入ant-desing-vue的样式文件。
  - 在代码import {Button} from 'ant-design-vue'
  - app.use(Button)

# vue(v3)变更的若干细节

- v-for 和 ref 可以一起使用（自己封装方法手动收集v-for中的ref实例）。
- 使用 defineAsyncComponent 定义异步组件（但注意不能用在路由懒加载中）。
- $attrs 在v2中无法接收class和style，在v3是可以的。this.$attrs/useAttrs()/setupCtx.attrs。
- $children 已经被移除了。（这会带来哪些影响？）
- 自定义指令，使用 app.directive()，需要注意是在v3中它的钩子发生了若干的变化。
- data选项，只支持工厂函数的写法，不支持对象的写法了。
- 在v3中，自定义事件在子组件中要使用 emits选项、defineEmits() 来接收事件。在子组件中如何触发这些自定义事件呢？ctx.emit('事件') / this.$emit() / const emit = defineEmits()。
- 在v3中，$on/$off/$once都移除了，只保留了$emit。
- 在v3中，全局过滤器、filters选项都移除了。
- 在v3中，支持片段（碎片），在template中可以使用多个根节点。
- 在v2和v3中，都支持函数式组件，但语法有很多不同，慎用函数式组件。
- v2中的Vue构造函数，在v3中已经不能再使用了，所以Vue静态方法和静态属性都不能使用了。在v3中新增了一套实例方法来代替，比如app.use()等。
- globalProperties和provide都向vue组件注入数据，但官方推荐使用provide向下游的组件注入数据。
- 在v2中，Vue.nextTick()/this.$nextTick不支持构建工具的“摇树”功能，所以在v3中用 nextTick 这个组合API替代了。
- 在v3中，v-if/v-else/v-else-if无须再加key，即使在<transition>动画中也无须再加key了。
- 在v2中，使用Vue.config.keyCodes可以修改键盘码，但在v3中已经淘汰了。
- 在v3中，$listeners移除了，所以在v3中无法使用$listeners来调用父组件给的自定义事件了。
- 在v2中，根组件挂载DOM时，可以使用el、也可以使用$mount()。在v3中只能使用$mount()来挂载了，在v3中这种挂载是向<div id='root'></div>节点中追加innerHTML。
- 在v3中，propsData选项已经被淘汰了。
- 在v3中的props中无法访问this了，可以使用inject来访问父级节点传递过来的数据。
- 在v2中，有一个render选项（本质上是一个渲染函数，这个渲染函数的形参是 h 函数）。在v3中已经不能使用render选项，建议使用 h 这个组合API。（h相当于React.createElement）
- Suspense 还尚未正式发布，不建议使用。作用是给异步组件添加Loading交互的。
- <transition>的两个指令发生了变化，动画class名字发生了变化。
- 在v3中，在同一个元素或组件上，可以同时使用多个v-model，语法 <Form v-model:xx='' v-model:yy='' />，在Form子组件中使用 props接收xx、yy这个属性，使用emits:['update:xx', 'update:yy'] 来接收v-model的事件。自定义修饰符的语法参考如下：
```
<SyncChild v-model:xx.even='xx' v-model:yy.hehe='yy' />

export default {
  props: {
    xx: Number,
    xxModifiers: { default: () => ({}) },
    yy: String,
    yyModifiers: { default: () => ({}) }
  },
  emits: ['update:xx'],
  setup(props, ctx) {
    const handle = () => {
      // 触发update:xx访问，并回传数据给父组件中的v-model:xx
      const { odd } = props.xxModifiers
      const { xx } = props
      ctx.emit('update:xx', odd?xx+1:xx+2)
    }
    return { handle, ...toRefs(props) }
  }
}
```
- 同一节点上使用v-for和v-if时，在v2中不推荐这么用；在v3这种写法是允许的，但v-if的优秀级更高。
- 在v2中，静态属性和动态属性同时使用，不确定最终哪个起作用；在v3中可以确定的，谁在后面谁起作用。
- 在v3中，注意watch对数组的监听问题，一定要 deep:true。
- 在v3中新增了 <teleport>（穿梭框），这相当于ReactDOM.createPortal()，它的作用是把指定的组件渲染到任意父级作用域的其它DOM节点上。

# vue响应式原理

- vue2中使用Object.defineProperty来实现的。
- vue3中使用ES6新增的Proxy来实现的。
- 面试要求，要能说清楚响应式的工作流程（参见vue2中响应式原理图）
```
var data = { a: 1, b: 2 }
var vm = new Proxy(data, {
  get(target, key) {
    console.log(`你访问了${key}，它的值是`, target[key])
    return target[key]
  },
  set(target, key, newVal) {
    console.log(`你修改了${key}，它的新值是`, newVal)
    target[key] = newVal
  }
})
```

# 简单聊一聊vue3中虚拟DOM和Diff运算

- jquery 和 vue 区别：前者是基于DOM操作的库，后者是基于虚拟DOM的MVVM框架。
- vue是有DOM操作的，只不过这些DOM操作被“隐藏”起来了。
- vue为什么需要虚拟DOM？虚拟DOM本质上对真实DOM结构的一种描述，每次有数据变化时就生成新的虚拟DOM，vue用diff运算来找出两个虚拟DOM之间的最小差异，然后再通过Watcher来更新视图。之所以有虚拟DOM的存在的意义，目的是“屏蔽”掉用户自己“滥”操作DOM，这不就是一种性能的提升，尤其对数据驱动的应用程序。

- vue2.0中的虚拟DOM是如何生成的？（逐层递归，最终生成一个JSON数据）
```
<div class='box'>
  <h1>线上课很开心</h1>
  <h1 v-text='some'></h1>
</div>
```
```
var vm = {
  tagName: 'div',
  props: {
    class: 'box'
  },
  children: [
    {
      tagName: 'h1',
      props: null,
      children: [
        { tagName: 'text', text: '线上课很开心' }
      ]
    },
    {
      tagName: 'h1',
      props: null,
      children: [
        { tagName: 'text', text: '玩游戏', patchFlag: 1, content: ctx.some }
      ]
    }
  ]
}
```
- 当some发生变化，some对应的set方法就要执行，要生成新的虚拟DOM（重新生成）
- 如何理解这个“新的虚拟DOM”呢？大约可以这么理，和第一次生成虚拟DOM是一样的。
- diff(旧vm，新vm) => 所有变化的最小节点（集合） => 进一步更新DOM
- 总结：vue2中生成虚拟DOM，没有考虑那些静态的节点；vue2.0在做diff运算时，同级比较，逐层递归，对那些“没有变化的静态节点”也做了比较。

- 那么vue3在生成虚拟DOM和diff运算时，有怎样的优化策略呢？
- 1、第一次生成虚拟DOM时，给静态节点添加标记并将其缓存起来。以后当data发生变化、再次生成虚拟DOM时，静态节点不再重新创建虚拟DOM，而是直接使用缓存中“静态节点”所对应的虚拟DOM。
- 2、在vue3中，事件节点上的事件（v-on），也会缓存起来，目的是避免事件的重新声明和重新绑定。
- 3、在做diff运算时，同级比较，逐层递归。但是比较时，如果这个节点是静态的，就直接忽略掉。

# 面试题：为什么vue3比vue2的性能更好？

- vue3使用了Proxy实现响应式，Proxy比Object.defineProperty的效率更高。
- vue3中生成虚拟DOM会添加PatchFlag标记，并且会把静态节点和事件都缓存起来，避免再次生成虚拟DOM时重新生成静态节点的Vnode。
- vue3使用效率更高的diff运算规则，在vue3中diff(patch方法)在同级比较时不再考虑静态节点了，这大大地提升diff的效率。

- 参考文献：https://zhuanlan.zhihu.com/p/150732926


# 聊一聊Vite

- 理念：vite运行速度会比较快，把它理解成@vue/cli。
- 学习资源：vite中文网 https://cn.vitejs.dev/guide/

- 为什么需要vite?
  - webpack作用是把项目模块，打包一个bundle（多个chunk）兼容支持浏览。webpack启动项目时，无论什么模块都打包。webpack对大项目不友好，启动速度慢，热更新也慢。
  - vite的优势，在构建本地开发服务器时速度非常好，热更新也快。

- vite和webpack的简单对比
  - 在vite眼中，一种是依赖（第三方包），一种是源码（你的代码），依赖和源码是分开的。在webpack眼中，一切皆模块，无论是依赖还是源码，都需要使用babel-loader进行加载处理。
  - vite是基于“浏览器已经普遍支持了ES Module语法”这一特性，所以vite在构建本地服务时，不对各种模块进行打包；webpack完全没有考虑浏览器的新特性，只要是模块，都一律使用各种loader进行处理，比如把ES6语法编译成ES5。
  - vite在启动本地服务，它不考虑编译的问题，它只考虑模块之间的依赖关系；当在浏览器中访问指定的页面时，浏览器才开始按需加载当前页面所需要的各种依赖，并且还会借助于浏览器的缓存功能把对应的资源缓存起来。 webpack在运行本地服务时，要对所有依赖和源码都编译，无论当前页面中有没有用到它，所以webpack特点是“先编译再运行”，所以页面越多、运行速度就越慢。
  - vite默认支持TS，但vite对TS代码不做校验了，把类型校验这个事儿交给IDE编辑器插件来负责；vite只负责把TS模块编译成JavaScript模块。webpack默认不支持TS，我们构建webpack的TS项目时，要自己安装typescript运行时，这个tsc会对TS代码校验和编译，既然要校验，所以启动项目时，就会比较慢。（以后做vite/webpack项目，都建议使用vscoode能够友好地校验TS类型）。
  - vite在HMR热更新的时候，也不进行编译，更新速度也会更快。webpack在项目代码变动，会重新编译，更新会很慢，大项目的时候会“卡住”。
  - vite是基于插件的，如果你想实现一些架构有关的技术，去插件市场寻找合适的插件。webpack是基于loader和plugin的。
  - vite虽然启动本地服务时无须打包，但正式发布时还是需要打包的，背后打包工具使用的是rollup；vite在发布项目也要打包，所以打包的速度和性能也是挺慢的。webpack无论是本地服务、还是打包上线，都需要对模块进行编译，所以两个环境都很慢。

- vite的一些若干细节
  - vite不执行TS类型检测，但会把.ts代码编译成javascript，背后使用的esbuild(不是tsc)这个构造工具来完成TS的转译，所以转译速度提升了20~30倍。
  - 为什么打包项目时用的是rollup，而不是esbuild呢？原因是，esbuild这个构建工具还处在开发中，对代码分割、TreeShaking还不够完善。
  - rollup -> 把JS代码，编译成各种不同模块化语法的包，比如AMD、CMD、UMD...
  - rollup和webpack一样，是一个比较成熟的构建工具。未来vite背后很有可能不再使用rollup了，完全使用esbuild来代替。
  - vite社区中有很多的插件，开箱即用。这些插件都需要在vite.config.js中进行配置，配置时还可以指定插件的运行顺序(enfore)、指定插件在哪个环境下起作用(apply)。
  - vite构建项目，默认使用项目根目录中的index.html作为单页面，在这个index.html中用script标签指定程序的入口文件。

  - 有兴趣的同学：rollup、esbuild、webpack、gulp


# 使用vite搭建前端工程化项目

- 注意：vite目前版本是v2，还处在发展阶段。
- 使用vite构建vue2、vue3、react项目（参考文档）

# vue3/vite技术栈总结

- vue3架构，比vue2，到底好在哪里？（解决了数据和逻辑不分离的问题）
- setup组合api，大约30+个，都要会用：ref、toRefs、reactive、computed、watch....
- 在vue3中，自定义Hooks解决“数据和逻辑不分离”
- 结合vue3文档中“vue2迁移”，学会查询，把vue3中若干变化的细节。
- vue3和vue2在响应式原理层面的变化，大家如果有兴趣，进一步深入研究，你可以看vue3源码。
- vue3在虚拟DOM和diff运算方面的优化，大家可以进一步搜索vue3文献资料研究。
- vite（rollup、esbuild）基本使用、系列特色功能、开发范式、社区插件。如果需要的话，你可以大胆地把vite放在工作进行实践。
- 议题1：因为vue3项目中语法极为灵活？你可以根据自己的理解，vue3最佳实践到底会走向何方？
- 议题2：vite的react领域，未来有没有前途？你也可以大胆去想象。
