//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import {Dispatch, Switch, connectStore} from '@elux/react-web';
import {CurView, ItemDetail} from '@react-team/article-model';
import ErrorPage from '@react-team/stage/components/ErrorPage';
import {FC} from 'react';
import {APPState} from '@/Global';
import Detail from './Detail';
import Edit from './Edit';
import List from './List';

export interface StoreProps {
  curView?: CurView;
  itemDetail?: ItemDetail;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {curView, itemDetail} = appState.article!;
  return {curView, itemDetail};
}

const Component: FC<StoreProps & {dispatch: Dispatch}> = ({curView, itemDetail, dispatch}) => {
  return (
    <Switch elseView={<ErrorPage />}>
      {curView === 'list' && <List />}
      {curView === 'detail' && <Detail itemDetail={itemDetail} />}
      {curView === 'edit' && <Edit itemDetail={itemDetail} dispatch={dispatch} />}
    </Switch>
  );
};

//connectRedux中包含了exportView()的执行
export default connectStore(mapStateToProps)(Component);
