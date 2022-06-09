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
    path: '/about',
    title: '关于',
    component: './about',
    isNav: true,
  },
]
