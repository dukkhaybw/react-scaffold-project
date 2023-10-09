import { createBrowserRouter } from 'react-router-dom';
import Layout, { LayoutLoader } from '@/layout';
import Login from '@/views/login';
import Home from '@/views/home/index';
import ErrorPage from '@/views/error';
import homeChildRoutes from './home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: LayoutLoader, // 加载对应的路由前会触发的类似于路由拦截器功能的函数
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />,
        children: homeChildRoutes
      },
      {
        path: 'about',
        lazy: () => import(/* webpackChunkName: "about" */ '@/views/about/index')
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);

export default router;
