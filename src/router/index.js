import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout';
import Home from '@/views/home/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
    path: '*',
    element: <div>404</div>
  }
]);

export default router;
