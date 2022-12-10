import {ServiceParamsType} from '@/types/services';
import {ReqOrderParams} from '@/api/generated/OrderApi';

class OrderService {
  private api;
  private cookie;
  private readonly dispatch;

  constructor({api, cookie, dispatch}: ServiceParamsType) {
    this.api = api;
    this.cookie = cookie;
    this.dispatch = dispatch;
  }

  async sendOrder(params: ReqOrderParams) {
    return this.api.orderApi.sendOrder(params);
  }
}

export default OrderService;
