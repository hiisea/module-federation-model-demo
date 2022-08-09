//定义本模块涉及的业务实体
import {IRequest} from '@react-team/stage-model';

export interface ListSearch {
  keyword: string;
  pageCurrent: number;
}
export interface ListItem {
  id: string;
  title: string;
  summary: string;
}
export interface ListSummary {
  pageCurrent: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export const defaultListSearch: ListSearch = {
  pageCurrent: 1,
  keyword: '',
};

export interface ItemDetail extends ListItem {
  content: string;
}

export enum CurView {
  'list' = 'list',
  'detail' = 'detail',
  'edit' = 'edit',
}

export type IGetList = IRequest<ListSearch, {list: ListItem[]; listSummary: ListSummary}>;
export type IGetItem = IRequest<{id: string}, ItemDetail>;
export type IDeleteItem = IRequest<{id: string}, {id: string}>;
export type IUpdateItem = IRequest<ItemDetail, {id: string}>;
export type ICreateItem = IRequest<ItemDetail, {id: string}>;
