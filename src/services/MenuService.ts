import {ServiceParamsType} from '@/types/services';

class MenuService {
  private api;
  private cookie;
  private readonly dispatch;

  constructor({api, cookie, dispatch}: ServiceParamsType) {
    this.api = api;
    this.cookie = cookie;
    this.dispatch = dispatch;
  }

  async getMenuList() {
    return this.api.menuApi.getMenuList();
  }
}

export default MenuService;
