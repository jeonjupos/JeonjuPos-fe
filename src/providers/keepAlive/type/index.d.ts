import { MutableRefObject } from 'react';

export interface BackControlType {
  backHistory: {
    [key: string]: BackHistoryType | undefined;
  };
  isBack: boolean;
}

export interface BackHistoryType {
  scrollPos: number;
  data?: { [key:string] : CacheDataType } | undefined;
}

export interface CacheDataType {
  state: { [key: string]: any };
  ref: { [key: string]: MutableRefObject<any> };
}
