import axios, { AxiosInstance } from 'axios';
import { llmProviders } from '../config/llm-providers.config';
import { LlmProvider } from '../interfaces/llm-provider.interface';

export const createApi = (provider: LlmProvider): AxiosInstance => {
  const { baseURL, headers, token } = llmProviders[provider];
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  api.interceptors.request.use((request) => {
    if (token) {
      if (provider === 'gemini') {
        request.headers['x-goog-api-key'] = token;
      } else {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
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

  return api;
};
