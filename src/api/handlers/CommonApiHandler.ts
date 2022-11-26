import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _get from 'lodash/get';
import { ApiError } from '@/types/api';
import { OpenToastType } from '@/providers/toast/type/toast';
import { OpenModalType } from '@/providers/modal/type/modal';
import CookieService from '@/services/CookieService';
import { ApiHandlerType } from '@/api/handlers/types/ApiHandler';

class CommonApiHandler implements ApiHandlerType {
  private readonly toast;
  private modal;
  private cookie;

  constructor({ toast, modal, cookie }: { toast?: OpenToastType, modal?: OpenModalType, cookie: CookieService }) {
    this.toast = toast;
    this.modal = modal;
    this.cookie = cookie;
  }

  request(request: AxiosRequestConfig) {
    request.headers = {
      ...request.headers,
      apiKey: '7dIVa9SdEw3BVB6qZKBC+67jcznkRCzD79Ejxq47LiM=',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    request.headers = { ...request.headers };

    return request;
  }

  response<T, C = any>(response: Promise<AxiosResponse>, config?: AxiosRequestConfig & C): Promise<T> {
    return new Promise((resolve, reject) => {
      response
        .then(response => resolve(response.data.body || response.data))
        .catch((error: AxiosError<ApiError>) => {
          const data = _get(error, 'response.data');
          const status: number = _get(error, 'response.status') || 0;
          const message: string = _get(data, 'summary.message') || '';

          if (status === 401) {
            const { location } = window;
            this.cookie.setCookie('login_redirect_qs', location.search);
            location.href = `${process.env.MEMBERSHIP_LOGIN_URL}?redirect_uri=${location.origin}${location.pathname}`;
          } else if (this.toast) {
            this.toast(message);
          }

          reject(message);
        });
    });
  }
}

export default CommonApiHandler;
