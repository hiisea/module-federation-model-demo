//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import {Switch, connectStore} from '@elux/react-web';
import {SubModule} from '@react-team/admin-model';
import {CurUser} from '@react-team/stage-model';
import ErrorPage from '@react-team/stage/components/ErrorPage';
import {FC} from 'react';
import {APPState, LoadComponent} from '@/Global';

//采用LoadComponent来加载视图，可以懒执行，并自动初始化与之对应的model
const My = LoadComponent('my', 'main');

export interface StoreProps {
  curUser: CurUser;
  subModule?: SubModule;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curUser} = appState.stage!;
  const {subModule} = appState.admin!;
  return {curUser, subModule};
}

const Component: FC<StoreProps> = ({curUser, subModule}) => {
  if (!curUser.hasLogin) {
    return null;
  }
  return <Switch elseView={<ErrorPage />}>{subModule === 'my' && <My />}</Switch>;
};

//connectRedux中包含了exportView()的执行
export default connectStore(mapStateToProps)(Component);
