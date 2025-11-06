import axios from 'axios';
import { DEEPSEEK_BASE_URL, DEEPSEEK_TOKEN } from '../utils/constants';

const api = axios.create({
  baseURL: DEEPSEEK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((request) => {
  const token = DEEPSEEK_TOKEN;

  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
});

api.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  },
);

export default api;
