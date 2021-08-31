import React, { lazy } from 'react';
import { Redirect } from 'react-router';
import { isValid } from '../utils';
/* eslint-disable react/display-name */
const routes = [
  {
    path: '/',
    component: lazy(() => isValid().then(valid => ({ default: () => <Redirect to={ valid ? '/admin' : '/login' } /> })))
  },
  {
    path: '/login',
    component: lazy(() => import('../pages/Login'))
  },
  {
    path: '/admin',
    exact: false,
    component: lazy(() => import('../containers/LayoutHandler'))
  }
];

export default routes;