/* eslint-disable react/no-danger */
import React, { ComponentClass, FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import useToast from '../hooks/useToast';
import { ToastType } from '../type/toast';

interface PropsType {
  toast: ToastType;
}

const Component = <P extends {}>({ is, props }: { is?: FunctionComponent<P> | ComponentClass<P> | string, props?: any }): JSX.Element => {
  if (is) return React.createElement(is, props);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<></>);
};

const ToastComponentStyle = styled.div`
  display: flex; justify-content: center; align-items: center; width: 100%; pointer-events: none;
  *{ pointer-events: auto; }
`;

const ToastComponent = ({ toast }: PropsType) => {
  const { closeToast } = useToast();

  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null);

  const duration = toast.duration ?? 400;
  const stayDuration = toast.stayDuration ?? 1000;

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      closeToast(toast.id);
    }, toast.duration);
  };

  const clickClose = () => {
    if (timeOutId) clearTimeout(timeOutId);
    close();
  };

  useEffect(() => {
    setOpen(true);

    const id = setTimeout(() => {
      close();
    }, duration + stayDuration);

    setTimeOutId(id);

    return () => closeToast(toast.id);
  }, []);

  useEffect(() => {
    setClassName(open ? 'toast-enter' : 'toast-leave');
  }, [open]);

  useEffect(() => {
    return () => {
      if (timeOutId) clearTimeout(timeOutId);
    };
  }, [timeOutId]);

  return (
    <ToastComponentStyle>
      <Component is={toast.component} key={toast.id} props={{ toast, className, close: clickClose }} />
    </ToastComponentStyle>
  );
};

export default ToastComponent;
