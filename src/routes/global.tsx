import React, { lazy } from 'react';
import { Redirect } from 'react-router';
import { isValid } from '../utils';
/* eslint-disable react/display-name */
const routes = [
  {
    path: '/',
    exact: false,
    component: lazy(() => import('../containers/LayoutHandler'))
  },
  {
    path: '/login',
    component: lazy(() => import('../pages/Login'))
  },
];

export default routes;