import {ServiceParamsType} from '@/types/services';
import {TABLE_LAYOUT} from '@/constants/tableLayout';
import {TableInfo} from '@/api/generated/SpaceApi';

class TableService {
  private api;
  private cookie;
  private readonly dispatch;

  constructor({api, cookie, dispatch}: ServiceParamsType) {
    this.api = api;
    this.cookie = cookie;
    this.dispatch = dispatch;
  }

  async getTableList() {
    const {spacelist} = await this.api.spaceApi.getTableList();
    return TABLE_LAYOUT.map(row => row.map(table => table !== 0 ? spacelist.find(space => space.spacenum === table) as TableInfo : null))
  }
}

export default TableService;
