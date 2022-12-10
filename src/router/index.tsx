import React, {useContext} from 'react';
import {Route, RouteMeta} from './types';
import {useEffect} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import NotFound from '@/views/pages/NotFound';
import useService from '@/hooks/useService';
import common from '@/router/common';
import order from '@/router/order';
import {RouterContext} from '@/router/provider';


const routeList: Route[] = [
  ...common,
  ...order,
];

export default function RouterView() {
  const {setRouteInfo} = useContext(RouterContext);
  const services = useService();

  /**
   * @description route middleware 함수이며 각 route module에서
   * import 해온 배열 정보 중 meta 필드를 확인하는 방식으로 작동
   */
  const middleware = (routes: Route[]) => {
    return routes.map((route) => {
      let newElement = route.element;
      if (route.meta) {
        const {authSlice} = JSON.parse(
          localStorage.getItem('persist:root') || '{}'
        );

        const {accessToken, user} = JSON.parse(authSlice || '{}');
        const cookieAccessToken = services.cookie.getCookie('accessToken');
        if (route.meta.isAuth) {
          if (!accessToken && !cookieAccessToken) newElement = <Navigate to="/login?redirect=true" />;
          else if (user?.status === 0 && route.path !== '/mypage' && route.path !== '/manageProfile') {
            newElement = <Navigate to="/mypage" />;
          }
        }
      }
      return {...route, element: newElement};
    });
  };

  /**
   * @description 현재 routing될 컴포넌트의 route 정보를 추출하여 {routeInfo, ,meta} 형식으로 반환
   */
  const getCurrentRouteInfo = (
    currentComponent: React.ReactElement<any,
      string | React.JSXElementConstructor<any>> | null
  ): { routeInfo: Route | null; meta: RouteMeta } => {
    if (!currentComponent) return {routeInfo: null, meta: {}};
    const routeInfo = routes.find(
      (route) => {
        return currentComponent.props.match.route.path === route.path;

      });

    return {routeInfo: routeInfo ?? null, meta: routeInfo?.meta ?? {}};
  };

  /**
   * @description middleware 검증 후 route 배열 정보를 routes 변수에 저장
   */
  const routes = middleware(routeList);

  /**
   * @description useRoutes 훅을 사용하여 현재 routing 될 컴포넌트 정보를 routing 변수에 저장
   */
  const routing = useRoutes([...routes, {path: '*', element: <NotFound />}]);

  const {routeInfo, meta} = getCurrentRouteInfo(routing);

  /**
   * @description 현재 라우팅 되는 route 정보를 redux에 mutate
   */

  useEffect(() => {
    console.log('routing!', routeInfo);

    if (routeInfo) setRouteInfo(routeInfo);
  }, [routeInfo]);

  const headerHide = meta.headerHide ? 'hide-header' : '';
  const footerBtn = meta.footerBtn ? 'footer-btn' : '';

  return (
    <div id={`wrapper`} className={`${headerHide} ${footerBtn}`}>
      {Boolean(routeInfo?.element) && routing}
    </div>
  );
}
