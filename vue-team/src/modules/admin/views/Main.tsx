//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import {Switch, connectStore, exportView} from '@elux/vue-web';
import {SubModule} from '@react-team/admin-model';
import {CurUser} from '@react-team/stage-model';
import ErrorPage from '@vue-team/stage/components/ErrorPage';
import {defineComponent} from 'vue';
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

const Component = defineComponent({
  name: 'AdminMain',
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {curUser, subModule} = storeProps;
      if (!curUser.hasLogin) {
        return null;
      }
      return <Switch elseView={<ErrorPage />}>{subModule === 'my' && <My />}</Switch>;
    };
  },
});

export default exportView(Component);
