import {AxiosRequestConfig} from 'axios';
import ApiConnection from '../ApiConnection';

export interface ApiResponseType {
  res_code: string;
  message: string;
}

export interface TableInfo {
  spacepkey: number;
  spacenum: number;
  cookingyn: 'Y' | 'N';
  amount: number;
  orderlist: TableOrderInfo[]
}

export interface TableOrderInfo {
  menuname: string;
  menucount: number;
  saleprice: number;
}

export interface TableListResponse extends ApiResponseType {
  spacelist: TableInfo[];
}

export default class SpaceApi<Config extends AxiosRequestConfig = AxiosRequestConfig> {
  constructor(private readonly api: ApiConnection) {}

  /** [모두] 배너 검색 */
  getTableList(config?: Config): Promise<TableListResponse> {
    return this.api.get('/list', {}, config);
  }
}
