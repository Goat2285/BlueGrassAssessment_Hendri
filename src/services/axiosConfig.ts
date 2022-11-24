import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.REACT_APP_HOST_API_KEY;

export const axiosRequest = <T = any>(
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT',
  path: string,
  config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'baseURL'>
): AxiosPromise<T> => {
  const axiosConfig: AxiosRequestConfig = {
    url: path,
    method: method,
    ...config,
    baseURL: BASE_URL,
  };

  return axios(axiosConfig);
};
