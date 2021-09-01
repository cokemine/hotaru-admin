import React, { FC, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';
import routes from './routes/global';
import './App.less';
import { IResp } from './types';
import Loading from './components/Loading';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
axios.interceptors.response.use(response => {
  const data: IResp = response.data;
  let desc: string | undefined;
  data.msg !== 'ok' && (desc = data.msg);
  notification.success({
    message: 'Success',
    description: desc
  });
  return response;
}, error => {
  const resp = error.response;
  const data: IResp = resp.data;
  notification.error({
    message: `${resp.status} ${resp.statusText}`,
    description: data?.msg
  });
  return Promise.reject(error);
});

const App: FC = () => {
  return (
    <Router basename="/admin">
      <Suspense fallback={ <Loading /> }>
        <Switch>
          {
            routes.map(
              route => <Route exact={ route.exact !== false } key={ route.path } path={ route.path } component={ route.component } />
            )
          }
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;