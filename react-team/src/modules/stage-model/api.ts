import {isServer} from '@elux/model';
import {IGetCurUser, ILogin, ILogout, guest} from './entity';
import {request} from './utils/request';

class API {
  public getCurUser(): Promise<IGetCurUser['Response']> {
    if (isServer()) {
      return Promise.resolve(guest);
    }
    return request
      .get<IGetCurUser['Response']>('/api/session')
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return guest;
      });
  }
  public login(params: ILogin['Request']): Promise<ILogin['Response']> {
    return request.put<ILogin['Response']>('/api/session', params).then((res) => {
      return res.data;
    });
  }

  public logout(): Promise<ILogout['Response']> {
    return request.delete<ILogout['Response']>('/api/session').then((res) => {
      return res.data;
    });
  }
}

export default new API();
