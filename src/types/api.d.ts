import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ObjectLiteral } from '@/types/utilType';
import { ToastOption } from '@/provider/toast/hooks/useToast';
import CookieService from '@/services/CookieService';

export type ApiErrorCode = 'DEFAULT' | string;

export type ApiErrorSummary = {
  success: false;
  code: ApiErrorCode;
  message: string;
};

export type ApiError<T = ObjectLiteral> = {
  summary: ApiErrorSummary;
  body: T | null;
};

export type ErrorResponse<T = ObjectLiteral> = {
  code: ApiErrorCode;
  message?: string;
  body: T | null;
  org: AxiosError<ApiError<T>>
};

export interface ApiHandlerConstructorParams {
  toast: (msg: string, options?: ToastOption) => void;
  cookie: CookieService;
}

export type HandlerType = { request: RequestHandler, response: ResponseHandler };
export type RequestHandler = (request: AxiosRequestConfig) => AxiosRequestConfig;
export type ResponseHandler = <T, C = any>(response: Promise<AxiosResponse>, config?: AxiosRequestConfig & C) => Promise<T>;
export type Api<T> = T & { cancelRequest(): void; };
