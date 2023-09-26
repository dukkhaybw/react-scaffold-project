import { createBrowserRouter } from 'react-router-dom';
import Layout, { LayoutLoader } from '@/layout';
import Login from '@/views/login';
import Home from '@/views/home/index';
import ErrorPage from '@/views/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: LayoutLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
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
