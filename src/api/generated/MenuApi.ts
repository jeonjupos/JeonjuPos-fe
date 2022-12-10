import {AxiosRequestConfig} from 'axios';
import ApiConnection from '../ApiConnection';
import {ApiResponseType} from '@/types/api';

export interface CategoryInfo {
  categorypkey: number;
  categoryname: string;
}

export interface MenuInfo {
  menupkey: number;
  menuname: string;
  saleprice: number;
  takeoutyn: boolean;
  takeinyn: boolean;
  takeoutprice: number;
}

export interface CategoryMenuListType {
  categorypkey: number;
  menulist: MenuInfo[];
}

export interface MenuListResponse extends ApiResponseType {
  categorylist: CategoryInfo[];
  categorymenulist: CategoryMenuListType[]
}

export default class MenuApi<Config extends AxiosRequestConfig = AxiosRequestConfig> {
  constructor(private readonly api: ApiConnection) {}

  /** 메뉴 리스트 조회 */
  getMenuList(config?: Config): Promise<MenuListResponse> {
    return this.api.get('/list', {}, config);
  }
}
