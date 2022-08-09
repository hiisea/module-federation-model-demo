//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {CurView} from '@react-team/my-model';
import ErrorPage from '@vue-team/stage/components/ErrorPage';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import UserSummary from './UserSummary';

export interface StoreProps {
  curView?: CurView;
}

function mapStateToProps(appState: APPState): StoreProps {
  return {curView: appState.my!.curView};
}

const Component = defineComponent({
  name: 'MyMain',
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {curView} = storeProps;
      return <Switch elseView={<ErrorPage />}>{curView === 'userSummary' && <UserSummary />}</Switch>;
    };
  },
});

export default exportView(Component);
