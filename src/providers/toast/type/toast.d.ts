import { FunctionComponent } from 'react';

export interface ToastType {
  id: number;
  component: FunctionComponent<{ toast: ToastType }>;
  msg: string;
  type?: 'success' | 'warning';
  emoji?: string;
  duration?: number;
  stayDuration?: number;
}

export interface ToastOption {
  type?: 'success' | 'warning';
  emoji?: string;
  duration?: number;
  stayDuration?: number;
}

export interface ToastFunctionType {
  toast: (msg: string, options?: ToastOption) => void;
}

export type OpenToastType = (msg: string, options?: ToastOption) => void;
export type CloseToastType = (id: number) => void;
