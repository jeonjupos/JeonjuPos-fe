import { Api } from '@/types/api';
import CookieService from '@/services/CookieService';
import { Dispatch } from 'react';
import SpaceApi from '@/api/generated/SpaceApi';
import MenuApi from '@/api/generated/MenuApi';
import OrderApi from '@/api/generated/OrderApi';

export type ApiService = {
  spaceApi: Api<SpaceApi>;
  menuApi: Api<MenuApi>;
  orderApi: Api<OrderApi>;
};

export interface ServiceParamsType {
  api: ApiService;
  cookie: CookieService;
  dispatch: Dispatch<any> | null;
}
