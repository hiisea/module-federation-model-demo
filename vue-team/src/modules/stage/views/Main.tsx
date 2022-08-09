import '../assets/css/global.module.less';
import {DocumentHead, LoadingState, Switch, connectStore, exportView} from '@elux/vue-web';
import {CurView, SubModule} from '@react-team/stage-model';
import {defineComponent} from 'vue';
import {APPState, LoadComponent} from '@/Global';
import ErrorPage from '../components/ErrorPage';
import LoadingPanel from '../components/LoadingPanel';
import LoginForm from './LoginForm';

//LoadComponent是懒执行的，不用担心
const SubModuleViews: {[moduleName: string]: () => JSX.Element} = Object.keys(SubModule).reduce((cache, moduleName) => {
  cache[moduleName] = LoadComponent(moduleName as any, 'main');
  return cache;
}, {});

export interface StoreProps {
  subModule?: SubModule;
  curView?: CurView;
  globalLoading?: LoadingState;
  error?: string;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {subModule, curView, globalLoading, error} = appState.stage!;
  return {
    subModule,
    curView,
    globalLoading,
    error,
  };
}

const Component = defineComponent({
  name: 'StageMain',
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {subModule, curView, globalLoading, error} = storeProps;
      return (
        <>
          <DocumentHead title="EluxDemo" />
          <Switch elseView={<ErrorPage />}>
            {!!error && <ErrorPage message={error} />}
            {subModule &&
              Object.keys(SubModule).map((moduleName) => {
                if (subModule === moduleName) {
                  const SubView = SubModuleViews[subModule];
                  return <SubView key={moduleName} />;
                } else {
                  return null;
                }
              })}
            {curView === 'login' && <LoginForm />}
          </Switch>
          <LoadingPanel loadingState={globalLoading} />
        </>
      );
    };
  },
});

export default exportView(Component);
