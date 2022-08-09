//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import {Switch, connectStore} from '@elux/react-web';
import {CurView} from '@react-team/my-model';
import ErrorPage from '@react-team/stage/components/ErrorPage';
import {FC} from 'react';
import {APPState} from '@/Global';
import UserSummary from './UserSummary';

export interface StoreProps {
  curView?: CurView;
}

function mapStateToProps(appState: APPState): StoreProps {
  return {curView: appState.my!.curView};
}

const Component: FC<StoreProps> = ({curView}) => {
  return <Switch elseView={<ErrorPage />}>{curView === 'userSummary' && <UserSummary />}</Switch>;
};

export default connectStore(mapStateToProps)(Component);
