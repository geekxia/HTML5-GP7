# uniapp简介

- uniapp：跨平台技术（一套前端代码，打包成多个平台的应用）
- uniapp：各种小程序、android app、ios app、快应用、webapp(h5)等等。
- 现在呈现的市场趋势是：很多中小型公司用uniapp做android app。（uniapp做小程序的公司比较少）

- 2018年9月，uniapp开源了（发布了）。

- 开发特点：一种是vue2风格、另一种是vue3风格（2021年8月左右）。


# 微信小程序开发

- 原生的微信小程序开发（四种文件）
- Wepy微信小程序官方的小程序框架：https://wepyjs.github.io/wepy-docs/2.x/#/
- mpvue做微信小程序：http://mpvue.com/

- Taro(v3)（react风格）
- uniapp(vue2风格)

# 编写readme语法

[百度](http://baidu.com)

![小孩子](./a.png)

|序号| 姓名	| 手机	| 地址	|	操作 |
|--	|--	|--	|--	|--	|
|	1|2	|	2|	3|3	|
|3	|	3|3	|	5|	6|

# Uniapp知识点（文档是最好的学习资源）

- 会安装HbuilderX软件（App版本）、会使用这个软件工具。
- 会创建uniapp项目（参考官网）不建议使用命令行创建。
- 要知识项目中每个文件的作用（manifest.json这个文件特别重要，切换vue版本）。

- 安装Vuex（在uniapp中已经内置了，自已会配置目录文件、编写vuex代码）
- 理解uniapp基于配置的特点（类似微信小程序风格），比如会配置tabBar、navigator。。
- 跨平台条件编辑：https://uniapp.dcloud.io/platform

- 组件使用：uniapp内置组件、h5标签、第三方UI组件（比如uni-ui、uview-ui）。。。
- 集成sass（在uniapp官网上注册开发账号，在HbuilderX登录、在插件市场中找到sass进行安装）
- 使用 uView 组件
  - uView官网：https://www.uviewui.com/
  - 样式导入：https://www.uviewui.com/components/downloadSetting.html

- 小程序调试：提前安装好各种小程序开发者工具，把HBX中运行好的代码导入到开发者工具中即可。

- 华为手机驱动：https://www.hihonor.com/cn/support/suite/
- 小米手机驱动：http://www.mi.com/c/service/download
- 苹果手机驱动：https://support.apple.com/kb/DL1816?viewlocale=zh_CN&locale=zh_CN
  - 手机上的“开发者设置”要打开！

- 混合开发
  - 打开一个具体的APP，哪些页面是混合的（前端做的）样式复杂、长页面；如果这个页面有文件上传之类的表单，不建议使用混合。
  - App和混合页面是怎么通信的？从App到混合页面使用查询参数，从混合页面向App通信使用postMessage()。

- App打包（以android为例）
 - 要在dcloud平台注册一个公司账号、实名备案、创建一个uniapp的应用（得到uniapp appid）。
 - 把uniapp中各种url改成线上真实的路径（如果有图片资源需要处理，也要注意图片的问题）
 - 生成app证书：安装java se8环境（配环境变量），使用keytool生成签名证书。
 - 打包前，在manifest.json（界面视图、源码视图），添加Logo、勾选当前uniapp中用到的功能模块、权限列表。
 - 如果当前uniapp中还用到了第三方工具（地图、支付、天气预报），也都是在manifest.json中进行权限配置。
 - 如果当前uniapp中还用到了dcloud官方的付费功能，都也要在manifest.json中配置。。。
 - 在HBX中选中项目，点击“发行->原生App打包”，按照要求填写信息，进行原生打包。
 - 在HBX中，点击“发行->查看App打包状态”，可以得到.apk包的下载地址。
