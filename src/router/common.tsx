import React from 'react';
import NotFound from '@/views/pages/NotFound';
import {Route} from '@/router/types';
import Home from '@/views/pages/home/Home';

// ex
/*
const commonRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: '/', element: <MainView />},
      {path: '404', element: <PageNotFoundView />},
      {path: 'account', element: <Navigate to='/account/list' />},
    ],
  };
 */

const common : Route[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/404',
    element: <NotFound />,
    meta:{
      headerHide: true,
      footerHide: true
    }
  },
];

export default common;
