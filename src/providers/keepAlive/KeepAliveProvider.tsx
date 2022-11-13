import React, { createContext, ReactNode, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { BackControlType, BackHistoryType } from '@/providers/keepAlive/type';
import _debounce from 'lodash/debounce';

interface PropsType {
  children: ReactNode;
  alwaysRemember?: boolean;
  maxPage?: number;
}

const initialValue: { current: BackControlType, alwaysRemember: boolean, maxPage: number } = {
  current: {
    backHistory: {},
    isBack: false,
  },
  alwaysRemember: false,
  maxPage: 10,
};

export const BackControlContext = createContext(initialValue);

const KeepAliveProvider = ({ children, alwaysRemember = false, maxPage = 10 }: PropsType) => {
  const { pathname } = useLocation();
  const changeRouter = useRef(false);
  const backHistoryStore = useRef(initialValue.current);
  const scrollPos = useRef(0);

  if (backHistoryStore.current.isBack) {
    if (changeRouter.current) {
      setTimeout(() => {
        changeRouter.current = false;
        backHistoryStore.current.isBack = false;
      }, 1000);
    } else {
      changeRouter.current = true;
    }
  }

  useEffect(() => {
    const pathName = window.location.pathname;

    const saveScroll = _debounce(() => {
      scrollPos.current = window.scrollY || window.pageYOffset;
    }, 100);

    const backEventCatch = () => {
      backHistoryStore.current.isBack = true;
    };

    window.removeEventListener('popstate', backEventCatch);
    window.addEventListener('popstate', backEventCatch);

    window.removeEventListener('scroll', saveScroll);
    window.addEventListener('scroll', saveScroll);

    return () => {
      window.removeEventListener('scroll', saveScroll);
      window.removeEventListener('popstate', backEventCatch);

      if (backHistoryStore.current.backHistory[pathName]) {
        (backHistoryStore.current.backHistory[pathName] as BackHistoryType).scrollPos = scrollPos.current;
      }
    };
  }, [pathname]);

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <BackControlContext.Provider value={{ ...backHistoryStore, alwaysRemember, maxPage: maxPage > 17 ? 15 : maxPage }}>
      {children}
    </BackControlContext.Provider>
  );
};

export default KeepAliveProvider;
