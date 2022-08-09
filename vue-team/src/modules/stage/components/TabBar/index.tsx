import {Link} from '@elux/vue-web';
import {PropType, defineComponent} from 'vue';
import styles from './index.module.less';

const props = {
  selected: {
    type: String as PropType<'article' | 'my'>,
    required: true as const,
  },
};

export default defineComponent({
  name: 'TabBar',
  props,
  setup(props) {
    return () => (
      <div class={styles.root}>
        <Link to="/article/list" action="relaunch" target="window" class={{item: true, on: props.selected === 'article'}}>
          文章
        </Link>
        <Link to="/admin/my/userSummary" action="relaunch" target="window" class={{item: true, on: props.selected === 'my'}}>
          我的
        </Link>
      </div>
    );
  },
});
