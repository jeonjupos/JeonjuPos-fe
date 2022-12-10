import {Route} from '@/router/types';
import React, {createContext, useRef} from 'react';

interface PropsType {
  children: React.ReactNode;
}

const initialValue: { routeInfo: Route, setRouteInfo: (routeInfo: Route) => void } = {
  routeInfo: {
    path: '/'
  },
  setRouteInfo: (routeInfo) => {
  }
};

export const RouterContext = createContext(initialValue);

const RouteProvider = ({children}: PropsType) => {
  const info = useRef(initialValue.routeInfo);

  const setRouteInfo = (routeInfo: Route) => {
    if (!routeInfo) return;

    const basicMeta = {
      headerHide: false,
      footerHide: false,
      isAuth: false
    };

    if (routeInfo.meta) {
      if (!info.current.meta) info.current.meta = {};
      info.current.meta.headerHide = Boolean(routeInfo.meta.headerHide);
      info.current.meta.footerHide = Boolean(routeInfo.meta.footerHide);
      info.current.meta.isAuth = Boolean(routeInfo.meta.isAuth);
    } else {
      info.current.meta = basicMeta;
    }

    info.current = {...routeInfo, meta: info.current.meta};
  };

  return (
    <RouterContext.Provider value={{routeInfo: info.current, setRouteInfo}}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouteProvider;
