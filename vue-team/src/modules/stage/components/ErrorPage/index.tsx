import {defineComponent} from 'vue';
import {useRouter} from '@/Global';
import styles from './index.module.less';

const props = {
  message: {
    type: String,
    default: '(404) Not Found!',
  },
};

export default defineComponent({
  name: 'ErrorPage',
  props,
  setup(props) {
    const router = useRouter();
    const onBack = () => router.back(1, 'page');
    return () => {
      return (
        <div class={styles.root}>
          <div class="message">{props.message}</div>
          <div class="back" onClick={onBack}>
            返回
          </div>
        </div>
      );
    };
  },
});
