import {Switch, connectStore, exportView} from '@elux/vue-web';
import {CurView} from '@react-team/shop-model';
import ErrorPage from '@vue-team/stage/components/ErrorPage';
import {defineComponent} from 'vue';
import {APPState} from '@/Global';
import List from './List';

export interface StoreProps {
  curView?: CurView;
}

function mapStateToProps(appState: APPState): StoreProps {
  return {curView: appState.shop!.curView};
}

const Component = defineComponent({
  name: 'ShopMain',
  setup() {
    const storeProps = connectStore(mapStateToProps);

    return () => {
      const {curView} = storeProps;
      return <Switch elseView={<ErrorPage />}>{curView === 'list' && <List />}</Switch>;
    };
  },
});

export default exportView(Component);
