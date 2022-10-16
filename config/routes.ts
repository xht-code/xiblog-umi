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
    path: '/article',
    title: '文章',
    component: './article/list',
    isNav: true,
  },
  {
    path: '/article/tag/:tagId',
    title: '文章标签',
    component: './article/tag',
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
