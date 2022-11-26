import { Api } from '@/types/api';
import CookieService from '@/services/CookieService';
import { Dispatch } from 'react';
import SpaceApi from '@/api/generated/SpaceApi';

export type ApiService = {
  spaceApi: Api<SpaceApi>;
};

export interface ServiceParamsType {
  api: ApiService;
  cookie: CookieService;
  dispatch: Dispatch<any> | null;
}
