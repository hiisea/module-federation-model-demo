import {DocumentHead, exportView} from '@elux/vue-web';
import NavBar from '@vue-team/stage/components/NavBar';
import {defineComponent} from 'vue';
import styles from './index.module.less';

const Component = defineComponent({
  name: 'ShopGoodsList',
  setup() {
    return () => {
      return (
        <>
          <NavBar title="商品列表" onBack />
          <div class={styles.root + ' g-page-content'}>
            <DocumentHead title="商品列表" />
            <div class="note">本页面主要用来演示小程序下的“分包加载”</div>
            <div class="list">
              <div class="item">---商品1---</div>
              <div class="item">---商品2---</div>
              <div class="item">---商品3---</div>
            </div>
          </div>
        </>
      );
    };
  },
});
export default exportView(Component);
