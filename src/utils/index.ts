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
