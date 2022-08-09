import {PropType, defineComponent, ref, watch} from 'vue';
import styles from './index.module.less';

const props = {
  keyword: {
    type: String,
    required: true as const,
  },
  onSubmit: {
    type: Function as PropType<(keyword: string) => void>,
    required: true as const,
  },
  onCreate: {
    type: Function as PropType<() => void>,
    required: true as const,
  },
};

export default defineComponent({
  name: 'ArticleSearchBar',
  props,
  emits: ['submit', 'create'],
  setup(props, {emit}) {
    const keywordInput = ref(props.keyword);
    watch(
      () => props.keyword,
      (value) => {
        keywordInput.value = value;
      }
    );
    const onSubmitHandler = () => {
      emit('submit', keywordInput.value);
    };
    const onCreateHandler = () => {
      emit('create');
    };
    return () => (
      <div class={styles.root}>
        <input class="keyword" name="keyword" type="text" placeholder="请输入搜索关键字..." v-model={keywordInput.value} />
        <button class="search" onClick={onSubmitHandler}>
          搜索
        </button>
        <div class="add" onClick={onCreateHandler}>
          +新增
        </div>
      </div>
    );
  },
});
