//该文件可以看作应用的配置文件
/* eslint-disable import/no-extraneous-dependencies */
import {AppConfig, setConfig} from '@elux/react-web';
import stage from '@react-team/stage';
import {HomeUrl} from '@react-team/stage-model';
import {parse, stringify} from 'query-string';

//定义模块的获取方式，同步或者异步都可以， 注意key名必需和模块名保持一致
//配置成异步import(...)可以按需加载
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const ModuleGetter = {
  //通常stage为根模块，使用同步加载，如果根模块要用别的名字，需要同时在以下setConfig中设置
  stage: () => stage,
  article: () => import('@react-team/article'),
  shop: () => import('@react-team/shop'),
  admin: () => import('@react-team/admin'),
  my: () => import('@react-team/my'),
};

//Elux全局设置，参见 https://eluxjs.com/api/react-web.setconfig.html
export const appConfig: AppConfig = setConfig({
  ModuleGetter,
  //Elux并没定死怎么解析路由参数，你可以使用常用的'query-string'或者'json'
  //只需要将parse(解析)和stringify(序列化)方法设置给Elux
  QueryString: {parse, stringify},
  NativePathnameMapping: {
    in(nativePathname) {
      if (nativePathname === '/') {
        nativePathname = HomeUrl;
      }
      return nativePathname;
    },
    out(internalPathname) {
      return internalPathname;
    },
  },
});

export type IModuleGetter = typeof ModuleGetter;
