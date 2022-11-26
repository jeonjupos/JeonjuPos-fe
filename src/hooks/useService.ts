import CookieService from '@/services/CookieService';
import ApiConnection from '@/api/ApiConnection';
import { Api } from '@/types/api';
import { ApiService } from '@/types/services';
import { useDispatch } from 'react-redux';
import CommonApiHandler from '@/api/handlers/CommonApiHandler';
import useToast from '@/providers/toast/hooks/useToast';
import useModal from '@/providers/modal/hooks/useModal';
import { OpenToastType } from '@/providers/toast/type/toast';
import { OpenModalType } from '@/providers/modal/type/modal';
import { ApiHandlerType } from '@/api/handlers/types/ApiHandler';
import SpaceApi from '@/api/generated/SpaceApi';
import TableService from '@/services/TableService';

let api: ApiService;

export const getApi = ({ toast, modal, cookie }: { toast?: OpenToastType, modal?: OpenModalType, cookie: CookieService }) => {
  const commonHandler = new CommonApiHandler({ toast, modal, cookie });

  const makeApi = <T extends new (...args: any[]) => any, I extends InstanceType<T>, P extends ApiHandlerType>(Api: T, path: string, handler: P): Api<I> => {
    const axios = new ApiConnection(path, handler);
    const api = new Api(axios);
    api.cancelRequest = axios.cancelRequest.bind(axios);

    return api;
  };

  const API_URL = process.env.API_URI as string;

  api = {
    spaceApi: makeApi(SpaceApi, `${API_URL}/space`, commonHandler),
    // userApi: makeApi(UserApi, `${API_URL}/user`, commonHandler),
    // authApi: makeApi(AuthApi, `${API_URL}`, commonHandler),
  };

  return api;
};

const useService = () => {
  const cookie = new CookieService();
  const { toast } = useToast();
  const { modal } = useModal();
  const dispatch = useDispatch();
  const api = getApi({ toast, modal, cookie });

  const serviceParams = {
    api,
    cookie,
    dispatch,
  };

  const services = {
    cookie,
    table: new TableService(serviceParams),
    ...api,
  };

  return { ...services };
};

export default useService;
