import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 用于打包时给文件添加hash值
  hash: true,
  // 用于配置hash路由或browser路由
  history: { type: 'hash' },
  layout: {},
  fastRefresh: {},
  // 用于加速热更新
  mfsu: {},
  title: 'UmiApp',
  // 有routes配置时，就是“配置式路由”
  // 没有routes配置时，就是“约定式路由”
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/user/list', component: '@/pages/user/index' },
    { path: '/user/list/:id', component: '@/pages/user/[id]' },
    { path: '/article/:study/abc', component: '@/pages/article/[study]/abc' },
    {
      path: '/good/list',
      component: '@/pages/good/list',
      // 使用 @/wrappers/auth.tsx 高阶组件，对当前路由规则进行“权限设计”
      wrappers: ['@/wrappers/auth'],
      // 定义当前组件内部的嵌套视图
      routes: [
        { path: 'car', component: '@/pages/good/components/car' },
        { path: 'office', component: '@/pages/good/components/office' },
      ]
    },
    // 指定 404 页面
    { component: '@/pages/user/404' },
  ],
  // 开启dva的immer
  dva: {
    immer: true,
    hmr: false
  },
});
