import React, { ComponentClass, FunctionComponent, useEffect } from 'react';
import { ModalType } from '../type/modal';
import useModal from '../hooks/useModal';

interface PropsType {
  modal: ModalType;
}

const Component = <P extends {}>({ is, props } : { is?: FunctionComponent<P> | ComponentClass<P> | string, props?: any }) : JSX.Element => {
  if (is) return React.createElement(is, props);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<></>);
};

const ModalComponent = ({ modal }: PropsType) => {
  const { closeModal, resolveModal } = useModal();

  const close = (modal: ModalType) => {
    closeModal(modal.id);
  };

  const resolve = <T extends unknown>(modal: ModalType, result: T) => {
    resolveModal(modal, result);
  };

  return (
    <Component
      is={modal.component}
      key={modal.id}
      props={{
        ...modal.props,
        close: () => close(modal),
        resolve: <T extends unknown>(result: T) => resolve(modal, result),
      }}
    />
  );
};

export default ModalComponent;
