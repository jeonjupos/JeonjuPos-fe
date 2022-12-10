import React from 'react';
import {Route} from '@/router/types';
import MenuOrder from '@/views/pages/order/MenuOrder';

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
    path: '/order/:tableId',
    element: <MenuOrder />
  },
];

export default common;
