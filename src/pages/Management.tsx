import React, { FC, useEffect, useState } from 'react';

import { Typography, Table, Tag, Modal, Input, Form, Switch, Button } from 'antd';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { IResp, RowServer } from '../types';

const { Title } = Typography;

const Management: FC = () => {

  const [dataSource, setDataSource] = useState<Array<RowServer>>([]);
  const [modifyVisible, setModifyVisible] = useState<boolean>(false);
  const [currentNode, setCurrentNode] = useState<string>('');
  const [multiImport, setMultiImport] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const columns: ColumnsType<RowServer> = [
    {
      title: 'SERVER',
      dataIndex: 'server',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render(_, record) {
        return (
          <div className="flex items-center text-sm">
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
      title: 'USERNAME',
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      align: 'center'
    },
    {
      title: 'LOCATION',
      dataIndex: 'location',
      align: 'center'
    },
    {
      title: 'REGION',
      dataIndex: 'region',
      align: 'center'
    },
    {
      title: 'STATUS',
      dataIndex: 'disabled',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: disabled => {
        return (
          disabled
            ? <Tag color="error">Disabled</Tag>
            : <Tag color="success">Enabled</Tag>
        );
      },
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render(_, record) {
        return (
          <div className="flex justify-evenly items-center">
            <EditOutlined onClick={ () => {
              form.setFieldsValue(record);
              setCurrentNode(record.username);
              setModifyVisible(true);
            } } />
            <DeleteOutlined onClick={ () => confirm({
              title: 'Are you sure you want to delete this item?',
              icon: <ExclamationCircleOutlined />,
              onOk: handleDelete(record.username)
            }) } />
          </div>
        );
      }
    }

  ];

  const fetchServers = () => {
    axios.get<IResp>('/api/server').then(res => {
      const data = res.data.data as Array<RowServer>;
      setDataSource(data);
    });
  };

  useEffect(fetchServers, []);

  const resetStatus = (fetch = true) => () => {
    fetch && fetchServers();
    form.resetFields();
    setCurrentNode('');
    setMultiImport(false);
    setModifyVisible(false);
  };

  const handleModify = () => {
    const data = form.getFieldsValue();
    axios.put('/api/server', { username: currentNode, data }).then(resetStatus());
  };


  const handleCreate = () => {
    const data = form.getFieldsValue();
    axios.post('/api/server', { ...data }).then(resetStatus());
  };

  const handleDelete = (username: string) => () => {
    axios.delete(`/api/server/${username}`).then(resetStatus());
  };

  return (
    <>
      <Title level={ 2 } className="my-6">Management</Title>
      <Table
        dataSource={ dataSource }
        columns={ columns }
        footer={ () => (
          <>
            <Button type="primary" className="mr-6" onClick={ () => setModifyVisible(true) }>New</Button>
            <Button type="primary" onClick={ () => {
              setMultiImport(true); setModifyVisible(true);
            } }>Import</Button>
          </>
        ) }
      />
      <Modal
        title={ currentNode ? 'Modify Configuration' : 'New' }
        visible={ modifyVisible }
        onOk={ currentNode ? handleModify : handleCreate }
        onCancel={ resetStatus(false) }
      >
        <Form layout="vertical" form={ form }>
          {multiImport ? (
            <Form.Item label="Data" name="data">
              <Input.TextArea rows={ 4 } />
            </Form.Item>
          ) : (
            <>
              <Form.Item label="Username" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input placeholder="留空不修改" />
              </Form.Item>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Type" name="type">
                <Input />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Input />
              </Form.Item>
              <Form.Item label="Region" name="region">
                <Input />
              </Form.Item>
              <Form.Item label="Disabled" name="disabled" valuePropName="checked">
                <Switch />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default Management;