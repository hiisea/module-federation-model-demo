//定义本模块涉及的业务实体
import {IRequest} from './utils/base';

export interface CurUser {
  id: string;
  username: string;
  avatar: string;
  mobile: string;
  hasLogin: boolean;
}

export interface LoginParams {
  username: string;
  password: string;
}

export type IGetCurUser = IRequest<{}, CurUser>;

export type ILogin = IRequest<LoginParams, CurUser>;

export type ILogout = IRequest<{}, CurUser>;

export enum SubModule {
  'article' = 'article',
  'shop' = 'shop',
  'admin' = 'admin',
}

export enum CurView {
  'login' = 'login',
}

export const guest: CurUser = {
  id: '',
  username: '游客',
  hasLogin: false,
  avatar: '',
  mobile: '',
};
