import React, { FC, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import routes from './routes/global';
import './App.css';
import { IResp } from './types';
import Loading from './components/Loading';
import { notify } from './utils';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${ token }`;
  return config;
});
axios.interceptors.response.use(_ => _, error => {
  const resp = error.response;
  const data: IResp = resp.data;
  notify(`${ resp.status } ${ resp.statusText }`, data?.msg, 'error');
  return Promise.reject(error);
});

const App: FC = () => {
  return (
    <Router basename={ '/admin' }>
      <Suspense fallback={ <Loading /> }>
        <Switch>
          {
            routes.map(
              route => <Route exact={ route.exact !== false } key={ route.path } path={ route.path }
                component={ route.component } />
            )
          }
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
