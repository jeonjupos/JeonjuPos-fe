import { FunctionComponent, ReactNode } from 'react';

export interface ModalType {
  id: number;
  props?: any;
  component: any;
  resolve: <T>(value: T) => void;
  reject: (reason?: any) => void;
}

export interface ModalComponentPropsType {
  children?: ReactNode;
  className?: string;
  close?: () => void;
  resolve?: <T>(value: T) => void;
}

type PropsOf<T> = T extends FunctionComponent<infer P> ? P : {};

export type OpenModalType = <T extends FunctionComponent<any>>(component: T, props?: PropsOf<T>, duplicateCheck?: boolean) => Promise<any>;
export type CloseModalType = (id: number) => void;
export type ResolveModalType = <T extends ModalType, R>(modal: T, result: R) => void;
export type CheckModalType = <T extends FunctionComponent>(component: T, onlyLastCheck?: boolean) => boolean;
