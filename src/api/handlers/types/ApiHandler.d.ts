import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiHandlerType {
  request: (request: AxiosRequestConfig) => AxiosRequestConfig;
  response: <T, C = any>(response: Promise<AxiosResponse>, config?: AxiosRequestConfig & C) => Promise<T>;
}
