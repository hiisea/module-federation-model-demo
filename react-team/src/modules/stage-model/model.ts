//定义本模块的业务模型
import {BaseModel, ErrorCodes, LoadingState, effect, reducer} from '@elux/model';
import {pathToRegexp} from 'path-to-regexp';
import {APPState} from '@/Global';
import api from './api';
import {CurView, SubModule, guest} from './entity';
import {CommonErrorCode, CustomError} from './utils/base';
import {HomeUrl, LoginUrl} from './utils/const';
import type {CurUser, LoginParams} from './entity';

//定义本模块的状态结构
export interface ModuleState {
  curUser: CurUser;
  subModule?: SubModule; //该字段用来记录当前路由下展示哪个子Module
  curView?: CurView; //该字段用来记录当前路由下展示本模块的哪个View
  globalLoading?: LoadingState; //该字段用来记录一个全局的loading状态
  error?: string; //该字段用来记录启动错误，如果该字段有值，则不渲染其它UI
}

//定义路由中的本模块感兴趣的信息
export interface RouteParams {
  pathname: string;
  subModule?: SubModule;
  curView?: CurView;
}

//定义本模块的业务模型，必需继承BaseModel
//模型中的属性和方法尽量使用非public
export class Model extends BaseModel<ModuleState, APPState> {
  protected routeParams!: RouteParams; //保存从当前路由中提取的信息结果

  //因为要尽量避免使用public方法，所以构建this.privateActions来引用私有actions
  protected privateActions = this.getPrivateActions({putCurUser: this.putCurUser});

  //提取当前路由中的本模块感兴趣的信息
  protected getRouteParams(): RouteParams {
    const {pathname} = this.getRouter().location;
    const [, subModuleStr = '', curViewStr = ''] = pathToRegexp('/:subModule/:curView', undefined, {end: false}).exec(pathname) || [];
    const subModule: SubModule | undefined = SubModule[subModuleStr] || undefined;
    const curView: CurView | undefined = CurView[curViewStr] || undefined;
    return {pathname, subModule, curView};
  }

  //每次路由发生变化，都会引起Model重新挂载到Store
  //在此钩子中必需完成ModuleState的初始赋值，可以异步
  //在此钩子执行完成之前，本模块的View将不会Render
  //在此钩子中可以await数据请求，这样等所有数据拉取回来后，一次性Render
  //在此钩子中也可以await子模块的mount，这样等所有子模块都挂载好了，一次性Render
  //也可以不做任何await，直接Render，此时需要设计Loading界面
  //这样也形成了2种不同的路由风格：
  //一种是数据前置，路由后置(所有数据全部都准备好了再跳转、展示界面)
  //一种是路由前置，数据后置(路由先跳转，展示设计好的loading界面)
  //SSR时只能使用"数据前置"风格
  public async onMount(env: 'init' | 'route' | 'update'): Promise<void> {
    this.routeParams = this.getRouteParams();
    const {subModule, curView} = this.routeParams;
    //getPrevState()可以获取路由跳转前的状态
    //以下意思是：如果curUser已经存在(之前获取过了)，就直接使用，不再调用API获取
    //你也可以利用这个方法，复用路由之前的任何有效状态，从而减少数据请求
    const {curUser: _curUser} = this.getPrevState() || {};
    try {
      //如果用户信息不存在(第一次)，等待获取当前用户信息
      const curUser = _curUser || (await api.getCurUser());
      const initState: ModuleState = {curUser, subModule, curView};
      //_initState是基类BaseModel中内置的一个reducer
      //this.dispatch是this.store.dispatch的快捷方式
      //以下语句等于this.store.dispatch({type: 'stage._initState', payload: initState})
      this.dispatch(this.privateActions._initState(initState));
    } catch (err: any) {
      //如果根模块初始化中出现错误，将错误放入ModuleState.error字段中，此时将展示该错误信息
      const initState: ModuleState = {curUser: {...guest}, subModule, curView, error: err.message || err.toString()};
      this.dispatch(this.privateActions._initState(initState));
    }
  }

  //定义一个reducer，用来更新当前用户状态
  //注意该render不希望对外输出，所以定义为protected
  @reducer
  protected putCurUser(curUser: CurUser): ModuleState {
    return {...this.state, curUser};
  }

  //定义一个effect，用来执行登录逻辑
  //effect(参数)，参数可以用来将该effect的执行进度注入ModuleState中，如effect('this.loginLoading')
  //effect()参数为空，默认等于effect('stage.globalLoading')，表示将执行进度注入stage模块的globalLoading状态中
  //如果不需要跟踪该effect的执行进度，请使用effect(null)
  @effect()
  public async login(args: LoginParams): Promise<void> {
    const curUser = await api.login(args);
    this.dispatch(this.privateActions.putCurUser(curUser));
    const fromUrl: string = this.getRouter().location.searchQuery.from || HomeUrl;
    //用户登录后清空所有路由栈，并跳回原地
    this.getRouter().relaunch({url: fromUrl}, 'window');
  }

  @effect()
  public async cancelLogin(): Promise<void> {
    //在历史栈中找到第一条不需要登录的记录
    //如果简单的back(1)，前一个页面需要登录时会引起循环
    this.getRouter().back((record) => {
      return !this.checkNeedsLogin(record.location.pathname);
    }, 'window');
  }

  @effect()
  public async logout(): Promise<void> {
    const curUser = await api.logout();
    this.dispatch(this.privateActions.putCurUser(curUser));
    //用户登出后清空所有路由栈，并跳首页
    this.getRouter().relaunch({url: HomeUrl}, 'window');
  }

  //ActionHandler运行中的出现的任何错误都会自动派发'stage._error'的Action
  //可以通过effect来监听这个Action，用来处理错误，
  //如果继续抛出错误，则Action停止继续传播，Handler链条将终止执行
  //注意如果继续抛出，请抛出原错误，不要创建新的错误，以防止无穷递归
  @effect(null)
  protected async ['this._error'](error: CustomError): Promise<void> {
    const router = this.getRouter();
    if (error.code === CommonErrorCode.unauthorized) {
      router.push({url: LoginUrl(error.detail)}, 'window');
    } else if (error.code === ErrorCodes.ROUTE_BACK_OVERFLOW) {
      //用户后退溢出时会触发这个错误
      const redirect: string = error.detail.redirect || HomeUrl;
      if (router.location.url === redirect && window.confirm('确定要退出本站吗？')) {
        //注意: back('')可以退出本站
        setTimeout(() => router.back('', 'window'), 0);
      } else {
        setTimeout(() => router.relaunch({url: redirect}, 'window'), 0);
      }
    } else if (!error.quiet) {
      // eslint-disable-next-line no-alert
      window.alert(error.message);
    }
    throw error;
  }

  private checkNeedsLogin(pathname: string): boolean {
    return ['/admin/', '/article/edit'].some((prefix) => pathname.startsWith(prefix));
  }

  //支持路由守卫
  //路由跳转前会自动派发'stage._testRouteChange'的Action
  //可以通过effect来监听这个Action，并决定是否阻止，如果想阻止跳转，可以抛出一个错误
  //注意：小程序中如果使用原生路由跳转是无法拦截的
  @effect(null)
  protected async ['this._testRouteChange']({url, pathname}: {url: string; pathname: string}): Promise<void> {
    if (!this.state.curUser.hasLogin && this.checkNeedsLogin(pathname)) {
      throw new CustomError(CommonErrorCode.unauthorized, '请登录！', url, true);
    }
  }
}
