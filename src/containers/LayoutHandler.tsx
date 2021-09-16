import Layout from './Layout';
import React, { FC, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { isValid } from '../utils';

const LayoutHandler: FC = () => {
  const [ valid, setValid ] = useState<boolean>();
  useEffect(() => {
    isValid().then(valid => setValid(valid));
  }, []);
  return (
    valid === undefined
      ? <Loading />
      : valid === true
        ? <Layout />
        : <Redirect to="/login" />
  );
};

export default LayoutHandler;
