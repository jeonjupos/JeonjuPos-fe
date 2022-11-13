import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BackHistoryType, CacheDataType } from '../type';
import { BackControlContext } from '../KeepAliveProvider';

const useKeepAlive = (key: string) => {
  const { current: backContext, alwaysRemember, maxPage } = useContext(BackControlContext);
  const pathName = window.location.pathname;

  // eslint-disable-next-line no-underscore-dangle
  window.__BACK_HISTORY__ = backContext.backHistory; // 디버깅창에서 디버그하기 쉽게 window객체에도 담아서 보여주도록 설정

  const tempStore = useRef<CacheDataType>({
    state: {},
    ref: {},
  });

  const getCacheData = () : CacheDataType | undefined => {
    const pageCacheData = backContext.backHistory[pathName]?.data;
    return (backContext.isBack || alwaysRemember) && pageCacheData ? pageCacheData[key] : undefined;
  };

  // 뒤로가기가 아닐 시에만 실행 되는 useEffect
  const useMount = (func: Function, deps: any[] = []) => useEffect(() => {
    if (!backContext.isBack) {
      func();
    }
  }, [...deps]);

  const useMemState = <S>(state: S, keyName: string) => {
    const cacheData = getCacheData();
    const cacheState = cacheData && cacheData.state[keyName];
    const resultState = useState<S>(cacheState ?? state);

    [tempStore.current.state[keyName]] = resultState;

    return resultState;
  };

  const useMemRef = <S>(ref: S, keyName: string) => {
    const cacheData = getCacheData();
    const cacheRef = cacheData && cacheData.ref[keyName];
    const resultRef = useRef<S>(cacheRef?.current ?? ref);

    tempStore.current.ref[keyName] = resultRef;

    return resultRef;
  };

  useEffect(() => {
    if (backContext.isBack || alwaysRemember) {
      if (backContext.backHistory[pathName]) {
        const backHistory = backContext.backHistory[pathName] as BackHistoryType;
        if (backHistory.scrollPos > 0) window.scrollTo(0, backHistory.scrollPos);
      }
    }

    return () => {
      const { state, ref } = tempStore.current;
      const prevData = backContext.backHistory[pathName]?.data || {};

      let history = {
        ...backContext.backHistory,
        [pathName]: {
          scrollPos: backContext.backHistory[pathName]?.scrollPos ?? 0,
          data: { ...prevData, [key]: { state, ref } },
        },
      };

      if (Object.entries(history).length > maxPage) {
        history = Object.entries(history).filter((_, idx) => idx !== 0).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      }

      backContext.backHistory = history;
    };
  }, []);

  return {
    isBack: backContext.isBack,
    useMount,
    useMemState,
    useMemRef,
  };
};

export default useKeepAlive;
