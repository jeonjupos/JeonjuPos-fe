/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Axios, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiHandlerType } from '@/api/handlers/types/ApiHandler';
import CommonApiHandler from './handlers/CommonApiHandler';

export default class ApiConnection<T extends ApiHandlerType = CommonApiHandler> {
  private readonly axios: AxiosInstance;
  private readonly handler: T;
  private abortController?: AbortController;

  constructor(baseURL: string, handler: T) {
    this.axios = axios.create({ baseURL });
    this.handler = handler;
    this.initRequestHandler();
  }

  private initRequestHandler() {
    if (!this.handler.request) return;
    const self = this;

    this.axios.interceptors.request.use(config => {
      return self.handler.request(config);
    });
  }

  private initAbortController() {
    this.abortController = new AbortController();
  }

  private getAxiosInstance<T extends keyof Pick<Axios, 'get' | 'post' | 'put' | 'delete'>>(type: T): Axios[T] {
    this.initAbortController();
    const self = this;

    return new Proxy<Axios[T]>(this.axios[type], {
      apply(target: any, thisArg: any, args: any[]) {
        const [config = {}] = args.splice(-1) as [AxiosRequestConfig];
        config.signal = self.abortController?.signal;
        const response = target.call(thisArg, ...args, config);

        return self.handler.response?.(response, config) ?? response;
      },
    });
  }

  get<T>(path: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.getAxiosInstance('get')(path, { ...config, params });
  }

  post<T>(path: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.getAxiosInstance('post')(path, data, config);
  }

  put<T>(path: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.getAxiosInstance('put')(path, data, config);
  }

  delete<T>(path: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.getAxiosInstance('delete')(path, { ...config, data });
  }

  /** API 요청 취소 */
  cancelRequest() {
    this.abortController && this.abortController.abort();
  }
}
