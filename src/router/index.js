import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layout';
import Home from '@/views/home/index';

const About = lazy(() => import(/* webpackChunkName: "about" */ '@/views/about/index'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<>...</>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div>
  }
]);

export default router;
