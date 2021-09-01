import React, { FC, useCallback, useContext, useEffect } from 'react';
import { Col, Row, Typography, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import StateCard from '../components/StateCard';

import { BiServer } from 'react-icons/bi';
import { AiFillWarning } from 'react-icons/ai';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import RoundIcon from '../components/RoundIcon';
import { StatusContext } from '../Context/StatusContext';

import { ITable } from '../types';
import { useState } from 'react';

const { Title } = Typography;

const Dashboard: FC = () => {

  const { servers, updated } = useContext(StatusContext);
  const [count, setCount] = useState({
    online: 0,
    min: Infinity,
    max: 0,
    record: {}
  });

  const timeSince = useCallback((): string => {
    const nowTime: number = Date.now() / 1000;
    if (!updated)
      return '从未.';
    const seconds: number = Math.floor(nowTime - updated);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1)
      return interval + ' 年前.';
    interval = Math.floor(seconds / 2592000);
    if (interval > 1)
      return interval + ' 月前.';
    interval = Math.floor(seconds / 86400);
    if (interval > 1)
      return interval + ' 日前.';
    interval = Math.floor(seconds / 3600);
    if (interval > 1)
      return interval + ' 小时前.';
    interval = Math.floor(seconds / 60);
    if (interval > 1)
      return interval + ' 分钟前.';
    else
      return '几秒前.';
  }, [updated]);

  useEffect(() => {
    let online = 0, min = Infinity, max = 0;
    const record: Record<string, number> = {};
    const add = (key: string) => {
      if (typeof record[key] === 'undefined') {
        record[key] = 0;
      } else {
        record[key]++;
      }
    };
    for (const item of servers) {
      if (item.status) online++;
      if (item.region == 'HK' || item.region == 'MO' || item.region == 'TW') add('CN');
      add(item.region);
      min = Math.min(min, record[item.region]);
      max = Math.max(min, record[item.region]);
    }
    setCount({ min, max, online, record });
  }, [servers]);

  const columns: ColumnsType<ITable> = [
    {
      title: 'SERVER',
      dataIndex: 'server',
      // eslint-disable-next-line react/display-name
      render(_, record) {
        return (
          <div className="flex items-center text-xs">
            <svg viewBox="0 0 100 100" className="mr-3 block h-12 w-12">
              <use xlinkHref={ `#${record.region}` } />
            </svg>
            <div className="whitespace-nowrap">
              <p className="font-semibold">{record.name}</p>
              <p className="text-left text-xs text-gray-600">{record.location}</p>
            </div>
          </div>
        );
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: status => {
        return (
          status
            ? <Tag color="success">Online</Tag>
            : <Tag color="error">Offline</Tag>
        );
      },
    },
    {
      title: 'UPTIME',
      dataIndex: 'uptime',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render(uptime) {
        let str = '-';
        if (uptime !== '-') {
          if (uptime >= 86400)
            str = `${Math.floor(uptime / 86400)} 天`;
          else {
            let h: string | number = Math.floor(uptime / 3600);
            let m: string | number = Math.floor(uptime / 60 % 60);
            let s: string | number = Math.floor(uptime % 60);
            h < 10 && (h = `0${h}`);
            m < 10 && (m = `0${m}`);
            s < 10 && (s = `0${s}`);
            str = `${h}:${m}:${s}`;
          }
        }
        return str;
      }
    },
    {
      title: 'LOAD',
      dataIndex: 'load',
      align: 'center'
    }
  ];


  return (
    <>
      <Title level={ 2 } className="my-6 text-3xl">Dashboard</Title>
      <Row gutter={ 32 }>
        <Col xs={ { span: 24 } } lg={ { span: 8 } } className="mb-8">
          <StateCard title="Servers Total" count={ servers.length } icon={
            <RoundIcon
              icon={ BiServer }
              iconColorClass="text-yellow-500"
              bgColorClass="bg-yellow-100"
            />
          }>
          </StateCard>
        </Col>
        <Col xs={ { span: 24 } } lg={ { span: 8 } } className="mb-8">
          <StateCard title="Servers Online" count={ count.online } icon={
            <RoundIcon
              icon={ HiOutlineStatusOnline }
              iconColorClass="text-green-500"
              bgColorClass="bg-green-100"
            />
          }>
          </StateCard>
        </Col>
        <Col xs={ { span: 24 } } lg={ { span: 8 } } className="mb-8">
          <StateCard title="Servers Offline" count={ servers.length - count.online } icon={
            <RoundIcon
              icon={ AiFillWarning }
              iconColorClass="text-blue-500"
              bgColorClass="bg-blue-100"
            />
          }>
          </StateCard>
        </Col>
      </Row>
      <Table
        className="rounded-lg max-w-full"
        dataSource={ servers }
        columns={ columns }
        footer={ () => <span className="text-xs">最后更新: {timeSince()}</span> }
      />
    </>
  );
};

export default Dashboard;
