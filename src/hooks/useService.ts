import CookieService from '@/services/CookieService';
import TournamentApi from '@/api/generated/TournamentApi';
import UserApi from '@/api/generated/UserApi';
import ApiConnection from '@/api/ApiConnection';
import { Api } from '@/types/api';
import { ApiService } from '@/types/services';
import LeagueService from '@/services/LeagueService';
import PartyService from '@/services/PartyService';
import AuthService from '@/services/AuthService';
import { isClient } from '@/constants/common';
import { useDispatch } from 'react-redux';
import AuthApi from '@/api/generated/AuthApi';
import AwsService from '@/services/AwsService';
import CommonApiHandler from '@/api/handlers/CommonApiHandler';
import useToast from '@/provider/toast/hooks/useToast';
import useModal from '@/provider/modal/hooks/useModal';
import { OpenToastType } from '@/provider/toast/type/toast';
import { OpenModalType } from '@/provider/modal/type/modal';
import { ApiHandlerType } from '@/api/handlers/types/ApiHandler';

let api: ApiService;

export const getApi = ({ toast, modal, cookie }: { toast?: OpenToastType, modal?: OpenModalType, cookie: CookieService }) => {
  const commonHandler = new CommonApiHandler({ toast, modal, cookie });

  const makeApi = <T extends new (...args: any[]) => any, I extends InstanceType<T>, P extends ApiHandlerType>(Api: T, path: string, handler: P): Api<I> => {
    const axios = new ApiConnection(path, handler);
    const api = new Api(axios);
    api.cancelRequest = axios.cancelRequest.bind(axios);

    return api;
  };

  const API_URL = process.env.API_URL as string;

  api = {
    tournamentApi: makeApi(TournamentApi, `${API_URL}/tournament`, commonHandler),
    userApi: makeApi(UserApi, `${API_URL}/user`, commonHandler),
    authApi: makeApi(AuthApi, `${API_URL}`, commonHandler),
  };

  return api;
};

const useService = () => {
  const cookie = new CookieService();
  const { toast = undefined } = isClient ? useToast() : {};
  const { modal = undefined } = isClient ? useModal() : {};
  const dispatch = isClient ? useDispatch() : null;
  const api = getApi({ toast, modal, cookie });

  const serviceParams = {
    api,
    cookie,
    dispatch,
  };

  const services = {
    cookie,
    aws: new AwsService(serviceParams),
    auth: new AuthService(serviceParams),
    league: new LeagueService(serviceParams),
    party: new PartyService(serviceParams),
    ...api,
  };

  return { ...services };
};

export default useService;
