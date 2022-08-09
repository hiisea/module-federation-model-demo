import {PropType, defineComponent} from 'vue';
import {useRouter} from '@/Global';
import styles from './index.module.less';

const props = {
  title: {
    type: String,
    required: true as const,
  },
  onBack: {
    type: [Function, Boolean] as PropType<Boolean | (() => void)>,
  },
};

export default defineComponent({
  name: 'NavBar',
  props,
  setup(props) {
    const router = useRouter();
    const onClick = () => {
      if (typeof props.onBack === 'function') {
        props.onBack();
      } else if (props.onBack === true) {
        router.back(1, 'window');
      }
    };
    return () => (
      <div class={styles.root}>
        {props.onBack && <div class="back" onClick={onClick} />}
        <div class="title">{props.title}</div>
      </div>
    );
  },
});
