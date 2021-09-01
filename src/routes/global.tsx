import React, { lazy } from 'react';
/* eslint-disable react/display-name */
const routes = [
  {
    path: '/login',
    component: lazy(() => import('../pages/Login'))
  },
  {
    path: '/',
    exact: false,
    component: lazy(() => import('../containers/LayoutHandler'))
  },
];

export default routes;