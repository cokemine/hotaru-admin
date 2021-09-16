import { notification } from 'antd';
import axios from 'axios';
import { IResp } from '../types';

let cachedValid = false;

export const isValid = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) {
    cachedValid = false;
    return false;
  }
  if (cachedValid) return true;
  try {
    const res = await axios.get<IResp>('/api/session');
    if (!res.data.code) {
      cachedValid = true;
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

export const notify = (message: string, description: string | undefined, type: 'success' | 'error' | 'info' | 'warning' | 'open' = 'open'): void => {
  notification[type]({
    message,
    description: description === 'ok' ? undefined : description
  });
};
