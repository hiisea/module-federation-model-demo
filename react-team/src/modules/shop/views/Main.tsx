import {Switch, connectStore} from '@elux/react-web';
import {CurView} from '@react-team/shop-model';
import ErrorPage from '@react-team/stage/components/ErrorPage';
import {FC} from 'react';
import {APPState} from '@/Global';
import List from './List';

export interface StoreProps {
  curView?: CurView;
}

function mapStateToProps(appState: APPState): StoreProps {
  return {curView: appState.shop!.curView};
}

const Component: FC<StoreProps> = ({curView}) => {
  return <Switch elseView={<ErrorPage />}>{curView === 'list' && <List />}</Switch>;
};

export default connectStore(mapStateToProps)(Component);
