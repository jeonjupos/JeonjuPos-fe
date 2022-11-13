import React, { createContext, FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import ToastComponent from './components/ToastComponent';
import { ToastType } from './type/toast';
import ToastDefaultTemplate from './components/ToastDefaultTemplate';

interface PropsType {
  children: React.ReactNode;
  toastComponent?: FunctionComponent<{ toast: ToastType }>
}

export interface ToastContextType {
  toasts: React.MutableRefObject<ToastType[]>;
  toastComponent: FunctionComponent<{ toast: ToastType }>;
  setToasts: (modals: ToastType[]) => void;
}

const initialValue: ToastContextType = {
  toasts: { current: [] },
  toastComponent: ToastDefaultTemplate,
  setToasts: () => {},
};

const ToastContainerStyle = styled.div`
  position: fixed; left:0; top:0; z-index: 1000000; width: 100%; height: 0;
`;

export const ToastContext = createContext(initialValue);

const ToastProvider = ({ children, toastComponent }: PropsType) => {
  const toastList = useRef<ToastType[]>([]);
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const value = useMemo(() => ({
    ...initialValue,
    toasts: toastList,
    toastComponent: toastComponent || initialValue.toastComponent,
    setToasts,
  }), [toastList, setToasts, toastComponent]);

  useEffect(() => {
    toastList.current = toasts;
  }, [toasts]);

  return (
    <ToastContext.Provider
      value={value}
    >
      <ToastContainerStyle>
        {toasts.map(toast => (
          <ToastComponent key={toast.id} toast={toast} />
        ))}
      </ToastContainerStyle>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
