import Layout from './Layout';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import useSWR from 'swr';
import { IResp } from '../types';

const LayoutHandler: FC = () => {
  const { data, error } = useSWR<IResp>('/api/session');
  return (
    error
      ? <Redirect to="/login" />
      : !data
        ? <Loading />
        : <Layout />
  );
};

export default LayoutHandler;
