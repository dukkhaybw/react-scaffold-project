import HomeMenu from '@/views/home/homeMenu/index';

const homeChildRoutes = [
  {
    path: '',
    element: <HomeMenu />
  },
  {
    path: 'test',
    // 可以考虑懒加载，也可以不考虑
    lazy: () => import(/* webpackChunkName: "homeTest" */ '@/views/home/homeTest/index')
  }
];

export default homeChildRoutes;
