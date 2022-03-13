# 环境搭建

- 不建议使用 create-react-native-app
- 建议使用 react-native
```
cnpm i react-native -g
react-native init MyApp
```

# ReactNative简介

- 来自于 Facebook 这家公司
- 背后依赖于 React，所以react版本是多少，你就可以使用怎么的react语法。
- RN 本质上提供了一套移动端的UI（Widget）、移动布局样式规范、操作手机系统的API。
- RN一套代码，可以打包成android app、ios app，所以RN也是一个跨平台的APP技术。

# 从技术的角度提一下简历技巧

- 亮点（学历、专业、年龄、排版、求职方向）=>你是一个有潜力、很用心、很细心。
- 技术点（突出某一个技术栈，避免什么都会、技术点版本、开发工具）=>你是技术综合能力强、并且是一个比较专注的人。
- 项目点（对照你找的项目，把这个项目的功能点罗列出来，越多越多）=>功能难点、功能亮点

# ReactNative学习方法

- 文档教程：看react-native文档，这是最完整教程。
- 环境搭建：学习建议snack中敲代码；如果是真实开发建议用mac搭建原生环境。
- 开源代码：自已去社区中找RN的开源项目，研究代码结构（架构）。
- 引申借鉴：学会了RN，之后学Flutter也比较容易。（如果一定要建议，建议研究一下Flutter）


# 开发环境搭建

- 沙盒环境：使用 expo-cli创建项目，在手机安卓expo app，通过手机扫码进行运行和调试。
- 原生环境：要考虑是windows环境，还是mac环境。(以mac为便说明RN的开发环境搭建)
  - 开发和调试android应用：Node、JDK、Android Studio、Watchman
  - 开发和调试ios应用：Node、Watchman、Xcode(mac电脑上一个开发工具)和CocoaPods(包管理器)。

- expo工具介绍：
  - expo-cli 对国内用户不太友好，不建议使用。
  - snack：在线的expo环境，在这个网站可以编写RN代码。地址：https://snack.expo.dev/
  - 如何学习RN？一边阅读RN文档，一边在snake中进行在线编程。

- RN内置组件和原生（Android/IOS）关系，在公司中原生可以编写组件，给RN使用。
- RN语法基础，完全遵从React风格（类组件、函数式组件）。
- RN中表单也是单向绑定（受控组件）。
- RN常用的列表组件有 SessionList、FlatList，支持下拉刷新、触底加载等多种功能。
- 在RN样式，建议使用 Flex布局、百分比布局，样式单位默认就是 px。如果在样式层面需要做兼容性，要配合系统API来实现。
- 在RN中，不建议使用背景图片，建议使用 ImageBackground；普通图片使用 Image 组件。
- 在RN中有一个非常重要的合成事件 onPress，在 Button、Touch* 系列组件上使用。
- 动画使用 Animated 这个API。
- 在RN开发，并不是任意的js语法都支持，没必须刻意安装@babel来支持各种语法。
- RN官方推荐使用 fetch 进行网络编程，当然你可以使用 axios。
- 以下是常见的RN面试题：
  - 谈一谈你对RN的理解及其编程范式。
  - 你常用的RN第三方库有哪些？
  - RN中路由系统是怎么样的？
  - RN环境搭建。。。。
  - RN中如何实现混合开发？RN程序和H5之间如何通信？
  - RN项目你遇到的难点和挑战。。。。
  - RN项目的打包流程、上线流程。。。

# RN路由系统

- react-router-native (不建议使用)
- react-native-navigation（仅供参考）
- react-navigation（官方推荐）：https://reactnavigation.org/

- 入门使用 react-navigation
- 配置路由容器、底部Tabbar、配置Screen路由。
```
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

const Home = () => (
  <Tab.Navigator>
    <Tab.Screen name='Home' component={Home} />
    <Tab.Screen name='Find' component={Find} />
  </Tab.Navigator>
)
const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Index' component={TabBar} options={{title:'首页'}} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
)
```
- 使用路由API：凡是被Screen修饰过的组件，其props上都有route路由信息、navigation路由API。
- 在最新的react-navigation(v6)，还可以使用 useNavigation、useRoute等路由Hooks进行编程。

# RN生态其它工具推荐

- 混合开发：react-native-webview
- 日期组件：react-native-datepicker 、react-native-calendars
- 设备信息：react-native-device-info
- ICON图标：react-native-vector-icons

- 温馨提示：社区中一些RN第三方包安装后，一般都要在ios目录进行链接操作`pod install`。

# Mac电脑调试ios App
- 在XCode中打开 RN 项目的 ios 目录、执行build编译。
- 在RN项目的ios目录下 `pod install` 链接ios原生依赖包。
- 在RN项目的根目录下 `npm run ios` 启动Xcode模拟器进行调试。
