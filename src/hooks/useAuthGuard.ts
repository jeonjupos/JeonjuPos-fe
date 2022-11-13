import { useTypedSelector } from '@/store';
import { isLogin } from '@/store/auth.store';
import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import useService from '@/hooks/useService';

interface ParamType {
  useRedirect: boolean;
}

const useAuthGuard = (params?: ParamType) => {
  const logined = useTypedSelector(isLogin, shallowEqual);
  const userInfo = useTypedSelector(state => state.authSlice.userInfo, shallowEqual);
  const { auth } = useService();

  const { useRedirect = true } = params || {};

  useEffect(() => {
    if (!logined && useRedirect) auth.login();
  }, [logined, useRedirect]);

  return { logined, userInfo };
};

export default useAuthGuard;
