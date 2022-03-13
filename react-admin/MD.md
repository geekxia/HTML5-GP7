# 问题：谈一谈vue和react的区别？

## 一、从编程范式的角度讲

- 在vue-loader、vue-template-compiler的支持下，vue可以采用SFC单文件组织的方式实现组件化；vue有指令，使用指令能够方便地渲染视图，vue表单是双向绑定的；vue组件是基于选项式的编程，常用选项有生命周期、计算属性、侦听器等；vue的组件库十分繁荣，自定义属性、自定义事件、自定义插槽是vue组件化的三大基础。众多社区中的vue轮子，在vue架构中被Vue.use注册即可使用。

- react的语法基础是JSX，react中没有指令，元素渲染、条件渲染、列表渲染、动态样式都是基于JSX语法的。在webpack环境中，要安装@babel/core、@babel/preset-react等，实现对JSX的编译。React表单是单向绑定的，推荐使用受控表单。组件封装可以是类组件，也可以函数式组件，其中props是React组件化的核心。

## 二、从组件通信的角度讲

- 在vue组件通信中，跨组件通信的手段极其丰富且灵活，常用的通信方案有父子组件通信、ref通信、事件总线、provide/inject、$parent/$children、$listeners/$attrs、slot插槽通信等。除此之外，在vue中还可以使用vuex 或 mobx 来实现跨组件通信。总体上来讲，vue的组件通信极其灵活，自上而下、自下而上都是容易实现的；也正是因为过于灵活，这会“诱惑”开发者容易滥用通信手段，导致vue项目呈现出“易开发、难维护”的现状。

- 在react中数据是单向数据流，在组件树中数据只能自上而下地分发和传递。state是组件自有的状态数据，props是父级组件传递过来的数据。在react中最最基本的通信方案是状态提升，还有React上下文也可以实现自上而下的数据流。鉴于react这种数据流的特性，即使集成了Redux仍然会呈现出单向数据流的特征，因此React数据流更容易被管理，配合Redux一起更适合做中大型的项目开发。

## 三、从底层原理的角度讲

- vue支持指令是因为背后有vue-template-compiler这个编译器的支持，把带有指令的视图模板转化成AST抽象语法树，进一步转化成虚拟DOM。vue的响应式原理是使用了 Object.defineProperty 进行了数据劫持，数据劫持发生vue组件的创建阶段，vue的响应式原理和mobx状态管理的响应式原理相似，这种响应式实现最早出现在 knockout 框架。如果要手写一个简单版本的vue，需要实现Compiler类（用于模板编译）、Watcher类（用于更新视图）、Dep类（用于依赖收集）、Observer类（用于数据劫持）、Vue类（构造函数）等。

- react自v16以后发生了很多变化，v16以后底层的“虚拟DOM”不再是简单JSON数据了，React采用了最新的Fiber（双向链表）的数据结构，作为“协调”（Diff）运算的基础数据。React背后还提供了强大的 react-reconciler 和 scheduler 库实现Fiber链表的生成、协调与调度。相比vue组件，react在较大组件方面的性能更高。如果要手写一个简易版本的React，其核心要实现以下功能，createElement（用于创建元素）、createDOM/updateDOM（用于创建和更新DOM）、render/workLoop（用于生成Fiber和协调运算）、commitWork（用于提交）等，如果还有支持Hooks，还得封装Hooks相关的方法。

## 四、从社区发展和未来展望的角度讲

- vue生态繁荣，用户基础大。vue3.0和vite的诞生给vue生态增加了新的生命力，同时也给vue开发者带来了空前的挑战。vue3.0众多新特性，以组合API、更友好地支持TS为代表，使得vue3.0的写法更加灵活。上手vue3.0并不难，但，要想写出健壮的可维护性更强的vue3.0代码，并不容易，这需要广大的前端开发者有更强大的前端基础功，对MVVM有深刻的理解和沉淀。

- react生态稳步向前，背后有强大的Facebook开发团队，从类组件编程向Hooks编程的转化指明了前进的方向。React(v18)呼之欲出，让前端开发者对React更具信心。在国内，阿里系的React开源项目繁荣，给以开发者足够的信心，至少三五年内深耕React仍然大有可为。

- 参考链接：
  - 追问1：什么Fiber?
