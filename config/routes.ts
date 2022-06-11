export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    title: '首页',
    component: './home',
    isNav: true,
  },
  {
    path: '/article/list',
    title: '文章',
    component: './article/list',
    isNav: true,
  },
  {
    path: '/article/:articleId',
    title: '文章详情',
    component: './article/detail',
  },
  {
    path: '/about',
    title: '关于',
    component: './about',
    isNav: true,
  },
]
