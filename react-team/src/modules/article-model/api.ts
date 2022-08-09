import {request} from '@react-team/stage-model';
import {ICreateItem, IDeleteItem, IGetItem, IGetList, IUpdateItem} from './entity';

export class API {
  public getList(params: IGetList['Request']): Promise<IGetList['Response']> {
    return request.get<IGetList['Response']>('/api/article', {params}).then((res) => {
      return res.data;
    });
  }

  public getItem(params: IGetItem['Request']): Promise<IGetItem['Response']> {
    if (params.id === '0') {
      return Promise.resolve({id: '', title: '', summary: '', content: ''});
    }
    return request.get<IGetItem['Response']>(`/api/article/${params.id}`).then((res) => {
      return res.data;
    });
  }

  public deleteItem(params: IDeleteItem['Request']): Promise<IDeleteItem['Response']> {
    return request.delete<IDeleteItem['Response']>(`/api/article/${params.id}`).then((res) => {
      return res.data;
    });
  }

  public updateItem(params: IUpdateItem['Request']): Promise<IUpdateItem['Response']> {
    return request.put<IUpdateItem['Response']>(`/api/article/${params.id}`, params).then((res) => {
      return res.data;
    });
  }

  public createItem(params: ICreateItem['Request']): Promise<ICreateItem['Response']> {
    return request.post<ICreateItem['Response']>(`/api/article`, params).then((res) => {
      return res.data;
    });
  }
}

export default new API();
