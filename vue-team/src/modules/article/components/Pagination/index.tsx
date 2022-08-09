import {Link} from '@elux/vue-web';
import {computed, defineComponent} from 'vue';
import styles from './index.module.less';

const props = {
  totalPages: {
    type: Number,
    required: true as const,
  },
  pageCurrent: {
    type: Number,
    required: true as const,
  },
  baseUrl: {
    type: String,
    required: true as const,
  },
};

function replacePageNumber(baseUrl: string, pageCurrent: number): string {
  return baseUrl.replace('pageCurrent=0', `pageCurrent=${pageCurrent}`);
}

export default defineComponent({
  name: 'ArticlePagination',
  props,
  setup(props) {
    const prevPage = computed(() => replacePageNumber(props.baseUrl, props.pageCurrent - 1));
    const nextPage = computed(() => replacePageNumber(props.baseUrl, props.pageCurrent + 1));
    return () => (
      <div class={styles.root}>
        {props.pageCurrent > 1 && (
          <Link class="item" action="push" target="page" to={prevPage.value}>
            上一页
          </Link>
        )}
        {props.pageCurrent < props.totalPages && (
          <Link class="item" action="push" target="page" to={nextPage.value}>
            下一页
          </Link>
        )}
        <div class="info">{`- 第 ${props.pageCurrent} 页 / 共 ${props.totalPages} 页 -`}</div>
      </div>
    );
  },
});
