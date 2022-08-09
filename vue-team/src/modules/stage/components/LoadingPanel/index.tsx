import {LoadingState} from '@elux/vue-web';
import {PropType, defineComponent} from 'vue';
import styles from './index.module.less';

const props = {
  loadingState: {
    type: String as PropType<LoadingState>,
  },
};

export default defineComponent({
  name: 'LoadingPanel',
  props,
  setup(props) {
    return () => (
      <div class={`${styles.root} ${props.loadingState?.toLowerCase()}`}>
        <div class="loading-icon" />
      </div>
    );
  },
});
