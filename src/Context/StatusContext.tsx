import React, { useState, FC, useEffect } from 'react';
import { BoxItem, ITable, StatusItem } from '../types';

interface IData {
  servers: Array<BoxItem | StatusItem>,
  updated: number;
}

interface IContext {
  servers: Array<ITable>,
  updated: number
}

export const StatusContext = React.createContext<IContext>({
  servers: [], updated: 0
});

export const StatusContextProvider: FC = ({ children }) => {

  const [status, setStatus] = useState<IContext>({ servers: [], updated: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:35601/public');
    ws.onopen = () => console.log('Connect to backend successfully!');
    ws.onclose = evt => console.log(`WebSocket disconnected: ${evt.reason}`);
    ws.onerror = evt => console.log(`An error occurred while connecting to the backend, ${evt}`);
    ws.onmessage = evt => {
      const data: IData = JSON.parse(evt.data);
      const { servers, updated } = data;
      const value: IContext = {
        servers: [],
        updated
      };
      for (const item of servers) {
        value.servers.push({
          name: item.name,
          location: item.location,
          region: item.region,
          load: item.status.load || '-',
          uptime: item.status.uptime || '-',
          status: item.status.online4 || item.status.online6
        });
      }
      setStatus(value);
    };
    return () => ws.close();
  }, []);

  return <StatusContext.Provider value={ status }>{children}</StatusContext.Provider>;
};

