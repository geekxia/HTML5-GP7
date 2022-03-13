# 为什么要读vue2.0源码？
- vue2.0是MVVM在中国市场崛起的标志，具有划时代的意义
- vue2.0是少有的我们有能力读懂的框架代码，你可以读懂
- vue2.0是你理解其它框架的基础，要站在巨人的肩膀上

# Element-UI（非常值得研究）
- 去github下载它的完整源码，分析它的目录结构、分析一些重要组件的封装技巧（组件化）
- 组件化，是前端工程师从"基础开发者"->迈向->"中高级开发者"的必经之路
- 研究Element-UI还具有现实意义，就是对你的开发工作也有很大帮助

# vue-router（还是比较简单的）
- 大家结合其源码和社区中开源的“手写vue-router”深入学习
- hash路由的实现原理  onhashchange
- history路由的实现原理  history api

# vuex（代码也比较简单）
- 大家结合其源码和社区中开源的“手写vuex”深入学习
- 进一步理解vuex数据流的特点，以及它和其它状态管理工具之间的差异
- 进一步理解Flux数据流管理对web应用的重要性，以提升开发能力

# vue3系列源码
- 目前还没有必要去研究，建议先研究vue2，夯实MVVM基础
- vue3源码15000多行，过于复杂，还不算稳定，没必要浪费精力钻研
- 等到以后vue3真的流行了，再研究还来得及；万一没流行起来，就算了哈

# vue就业

- Vue全家桶文档、Vue3全家桶文档（这些是vue最好的教程）
- UI组件库使用（Element-UI）
- Vue-Element-Admin开源架构
- 提升：Vue2源码、ElementUI源码、JavaScript基本功

-------------------------------------------------------------

# 谈一谈React版本差异性

- V16以前的版本（大约4年以前）
  - 传统的React架构，有虚拟DOM，这种虚拟DOM就是普通的JSON数据
  - 普遍使用类组件及其生命周期进行开发，没有Hooks API
  - 虚拟DOM的生成方式：一次性递归遍历生成虚拟DOM，这会霸占浏览器主线程，生成vnode的过程是不可中断的，通常会阻塞浏览器，导致浏览器中表单输入、动画卡顿。
  - 调用this.setState时，触发render()，在更新阶段生成新的vnode，执行diff运算的方式也是递归调用，效率并不高。

- V16以后的版本
  - React从V16开始，摒弃掉了传递React架构，采用大名鼎鼎的Fiber架构。
  - 什么Fiber架构？简单说，就是使用一颗“Fiber树”（本质上是一种双向链表的结构）来描述真实DOM（不再是普通的JSON数据）
  - React自V16.8开始新增了Hooks API，让函数式组件得以广泛地应用（大约3年多年前），如今市场中React Hooks编程已经呈现出“欣欣向荣”。
  - 生成“Fiber树”的方式，变成异步的，不再强行霸占浏览器的主线程了；只有当浏览器主线程比较“空闲”时，才继续生成“Fiber树”，所以生成Fiber树的过程是可以被自动中断的。
  - 当setState时，也会触发进入render更新阶段，生成新Fiber树，接执行大名鼎鼎的“协调运行”(是基于双向链表结构的一种diff运算)，这个“协调运算”的过程不再是传统的“递归遍历”，而是“循环遍历”。自行思考：为什么循环遍历比递归遍历的效率更高？

- V16.8以前的版本
  - 支持类组件和生命周期
  - 也支持函数式组件，但没有Hooks API

- V16.8以后的版本
  - 支持类组件和生命周期
  - 也支持函数式组件，可以使用Hooks API进行编译

- V17.0.2 目前常用的版本

- V18 呼之欲出

- 结论：以后我们再探讨React时，默认探索的是Fiber架构、协调运算、Hooks原理。我们没有必要再关心三四年前的React底层原理了。

# React源码分析方法介绍（以React V16.8为例）

- 第一种分析方法：
  - 下载react.development.js文件的源码，从头到尾浏览，简单梳理语法障碍。
  - 下载react-dom.development.js文件，从头到尾浏览。
  - react源码中，包括了React的核心语法和API封装，建议多翻翻。
  - react-dom源码中，包括了DOM渲染方法、各种DOM功能，简单瞅瞅就行了。

- 第二种分析方法：
  - 下载react官网仓库中的代码，搞清楚目录结构、各个包的作用。
  - 下载地址：https://github.com/facebook/react，进一步查看packages目录。
  - react-dom  这是DOM渲染的若干功能。
  - react   这是React核心语法及其API封装的包
  - react-reconciler 用于生成“Fiber树”和“协调运算”的。
  - scheduler，它是模拟requestIdleCallback(fn)的兼容性实现，用于执行复杂的任务，当浏览器主线程有“空闲”时执行这些复杂的任务，不霸占浏览器主线程。
  - 有兴趣研究：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback

- 第三种分析方法：
  - 用工程化环境或者HTML页面，引入react.js和react.dom.js，在源码中进行调试学习。
  - 如果采用HTML页面的方式来分析React源码，还要引入babel.js，对JSX语法进行编译，在script标签还要添加 type='text/babel'。
  - 慢慢通过删减、调试的方式，把react.js中无用的逻辑都删除，得到一个mini-react。

# 我们该如何研究React呢？（学习资源推荐）

- BuildYourOwnReact：https://pomb.us/build-your-own-react/
- 研究Fiber架构和流程：https://segmentfault.com/a/1190000020736966
- Jocky的个人博客：https://react.jokcy.me/

# BuildYourOwnReact

1、学习createElement的封装
这个方法用于创建一个Fiber单元，每个Fiber单元都是一个普通的JSON数据。
Fiber树是如何形成的？每一个Fiber单元都有一个child属性指向它的第一个子Fiber，还有一个sibling属性指向下一个兄弟Fiber单元，还有一个parent属性指向父Fiber单元，还有一个alternate属性指向旧的Fiber单元。
createElement是@babel/preset-react对JSX语法编译后的结果。

2、学习render的封装
这个方法的作用用于更新DOM的。
约定：element表示React元素，node表示DOM节点（DOM对象）
约定：nodeValue表示当前DOM节点的innerText

3、并发模式（提出问题）
什么问题？当DOM树太大时，render方法要调归调用，这个递归调用是不能中断的，它要一次性生成DOM树，这会阻塞浏览器的主线程。在这时，如果浏览还有执行流畅的用户输入和动画，这就会发生卡顿。
解决方案：把这个庞大的render工作切割成若干个小的工作单元。并且当每个小单元执行完成时，允许浏览器中断这个redner过程。
用代码如何实现？requestIdleCallback、workLoop、performUnitOfWork
  - requestIdleCallback是为了模拟"React调度"功能,允许render阶段被中断
  - workLoop 把render这个大任务拆分成多个执行子单元, 循环执行
  - performUnitOfWork 是用于执行工作的,并返回新的工作单元

4、Fiber实现（Fiber架构）

为了更好地组织这些工作单元（把它们串起来），我们需要一种巧妙的数据结构：Fiber Tree（本质上是一种双向链表的数据结构）
到底什么是“工作单元”？在React中，每一个DOM节点都将被认为是一个“工作单元”。

关于Fiber树的理解：
1、这里的每一个“圆圈”都叫做一个“工作单元”。
2、每一个“工作单元”，你可以理解成是一个“Fiber数据单元”。
3、这些“Fiber数据单元”，通过相互引用，串了起来，就是我们所说的“Fiber树”。
4、所以，“Fiber树”，本质上就是对“DOM树”的一种有序的描述。

关于Fiber的执行流程
1、第一个工作单元就是根节点，当一个工作单元完成时，就开始执行下一个工作单元。
2、当前节点执行完成后，找第一个儿子节点进行执行；如果没有儿子节点，就找下一个兄弟节点来执行；如果儿子节点和下一个兄弟节点都没有，就找叔叔节点来执行；依次类推。
3、直到再次回到根节点时，就说明这个庞大的异步任务已经做完了。

为了能够更容易找到下一个工作单元，所以我们要为每个Fiber单元都添加这三个指针：
  - fiber.child 表示当前Fiber单元的第一个儿子节点
  - fiber.sibling 表示当前Fiber单元的下一个兄弟节点
  - fiber.parent 表示当前Fiber单元的父亲子节点

5、两个阶段

- 知识点：React组件的渲染是分为两个阶段
  - render阶段：不执行DOM功能，这个过程是可以被浏览器中断的，也可重启继续工作。这个阶段主要工作，就是创建Fiber、调协运算等。
  - commit阶段：执行DOM更新，这个过程是不可以中断的，用于创建真实的DOM结构。

- 为什么要把React组件渲染分为上述两个阶段呢？
  如果不分阶段，那么DOM操作就发生在perforeUnitOfWork中，当浏览器比较忙时，这有可能会被requestIdleCallback(workLoop)中断，一旦发生中断，用户将看到一个不完整的网页页面。这是一件很糟糕的事儿。
  所以才要分开两个阶段，在render阶段只做Fiber创建相关的事，即使它中断，也不影响DOM更新；在commit阶段一次性更新DOM，这不会发生中断，用户体验大大提升了。

- 虽然在render阶段(workLoop)，虽然咱们没有执行真正的DOM操作，但是咱们使用了一个 wipRoot 来跟踪这项工作。

当整个render阶段(workLoop)完成时，说明已经没有下一个工作单元了，这时我们要commit提交整个FiberTree去更新DOM。结论：当wookLoop不再工作了(没有下一个单元了)，我们就commit更新DOM。

6、Reconciliation协调运算

问题：我们现在已经能够向DOM添加元素了，那么请问节点的更新和删除怎么呢？
思考：当DOM节点更新或删除时，我们不能像jQuery那些肆意地更新视图，我们应该在Fiber树的基础上找到最小化的“脏节点”来更新视图。

什么是协调运算？使用新Fiber树和旧Fiber树，进行对比，要把那些变化的Fiber标记出来，再交给commit去更新DOM视图。

如何对比这两颗Fiber树呢？对比的规则如下：
1、如果oldFiber.type === element.type，这说明我们只需要更新这个节点的属性即可，将其标记为 "UPDATE"。
2、如果element.type，找不到对应的oldFiber，这说明element是新增的节点，我们将其标记为 "PLACEMENT"。
3、如果oldFiber.type，找不到对应的element.type，这说明oldFiber被删除了，我们将其标记为 "DELETION"。

注意：我们根据build your own react文章，我们调整了 Reconciliation的逻辑，给它加入了Fiber的创建和添加脏节点标记的逻辑。

7、函数式组件

div  你可把它理解 HTML5 内置的组件，怎么用？ <div />
App  这是我们封装的React函数式组件，怎么用？ <App />

实现函数式组件有两个不同的地方需要注意：
1、函数式组件没对应的DOM节点，document.createElement('App')返回的不是DOM。
2、因为函数式组件是函数，所以得调用它才能得到它的children(即函数式组件的返回值)

在实现函数式组件时，需要做以下几件事：
1、添加函数式Fiber节点时，要向上寻找可挂载的$el节点（非函数式的Fiber节点）
2、删除函数式Fiber节点时，要向下寻找可删除的dom节点（非函数式的Fiber节点）

8、Hooks封装实现

- 什么Hooks API ? 只能在函数式组件中使用的一套API，它们像是一只只无形的手，在React底层为你提供数据、修改数据。
- hooks原理：hooks API所定义的数据或逻辑，都保存React底层；（请问useState做了什么事儿？）当初始化时，useState等API会在react底层创建并缓存数据；当触发set*系列方法时，实际上也在调用react底层中的操作state的方法，设置fiber初始化工作单元，render阶段就开始异步地工作，生成新Fiber树并进行节点标记，当协调完成后触发进入commit阶段，一次性更新函数式组件。


# React最后总结

- 基本功：从发展趋势来，React肯定是主流MVVM框架，对好程序员必须把React作为前端基本之一，研究React原理、前端框架的发展、JS基础功、设计模式、算法。

- 架构能力：学习React是非常适合学习前端工程化、前端架构的。以react为出发点，对周边生态也要不断地深入实践。
  - 构建工具：webpack、vite、esbuild、rollup
  - 运行时环境：node.js、谷歌v8引擎
  - JS版本：Babel、typescript、ES6+
  - CSS预编译器：sass、less、stylus
  - 代码检测工具：ESLint、TSLint
  - 数据管理：axios、状态管理工具Flux、node.js数据代理、mockjs
  - 测试用例：jest
  - 服务端渲染：Next.js

- 业务能力（React组件化）
  - 以ant-design为目标，工作多翻阅这些UI组件库的源码。
  - 可视化组件：2D图形图表、3D图形图表（D3、three.js）
