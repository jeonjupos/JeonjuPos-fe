import {AxiosRequestConfig} from 'axios';
import ApiConnection from '../ApiConnection';
import {ApiResponseType} from '@/types/api';

export interface ReqOrderType {
  menupkey: number;
  count: number;
  discount: number;
}

export interface ReqOrderParams {
  spacepkey: number;
  ordermenulist: ReqOrderType[];
  takeoutyn: boolean;
}

export default class OrderApi<Config extends AxiosRequestConfig = AxiosRequestConfig> {
  constructor(private readonly api: ApiConnection) {}

  /** 주문하기 */
  sendOrder(params: ReqOrderParams, config?: Config): Promise<ApiResponseType> {
    return this.api.post('', params, config);
  }
}
