import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { ModalType } from './type/modal';
import styled from 'styled-components';
import ModalComponent from './components/ModalComponent';

interface PropsType {
  children: React.ReactNode;
  scrollRelease?: () => void;
  scrollFreeze?: () => void;
}

export interface ModalContextType {
  modals: React.MutableRefObject<ModalType[]>;
  setModals: (modals: ModalType[]) => void;
  scrollRelease?: () => void;
  scrollFreeze?: () => void;
}

const initialValue: ModalContextType = {
  modals: { current: [] },
  setModals: () => {},
};

const ModalContainerStyle = styled.div`
  position: absolute; left:0; top: 0; z-index: 10000;
  > button { position: fixed; left:0; top: 0; z-index: 100000; }
`;

export const ModalContext = createContext(initialValue);

const ModalProvider = ({ children, scrollRelease, scrollFreeze }: PropsType) => {
  const modalList = useRef<ModalType[]>([]);
  const [modals, setModals] = useState<ModalType[]>([]);

  const value = useMemo(() => ({
    ...initialValue,
    modals: modalList,
    setModals,
    scrollRelease,
    scrollFreeze,
  }), [scrollRelease, scrollFreeze]);

  useEffect(() => {
    modalList.current = modals;
  }, [modals]);

  return (
    <ModalContext.Provider
      value={value}
    >
      <ModalContainerStyle>
        {modals.map(modal => (
          <ModalComponent key={modal.id} modal={modal} />
        ))}
      </ModalContainerStyle>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
