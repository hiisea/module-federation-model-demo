import {DocumentHead, Link, exportView} from '@elux/vue-web';
import {ItemDetail} from '@react-team/article-model';
import {PropType, defineComponent} from 'vue';
import styles from './index.module.less';

const props = {
  itemDetail: {
    type: Object as PropType<ItemDetail>,
  },
};

const Component = defineComponent({
  name: 'ArticleDetail',
  props,
  setup(props) {
    return () => (
      <div class={`${styles.root} g-page-content`}>
        <DocumentHead title={props.itemDetail?.title || '......'} />
        <div class="hd">
          <Link class="back" to={1} action="back" target="window"></Link>
          <div class="title">{props.itemDetail?.title || '......'}</div>
          <div class="summary">{props.itemDetail?.summary || '......'}</div>
        </div>
        <div class="bd">{props.itemDetail?.content || ''}</div>
      </div>
    );
  },
});

export default exportView(Component);
