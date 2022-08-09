import {Dispatch, DocumentHead, Link, exportView} from '@elux/vue-web';
import {ItemDetail} from '@react-team/article-model';
import NavBar from '@vue-team/stage/components/NavBar';
import {PropType, defineComponent, ref, watch} from 'vue';
import {Modules} from '@/Global';
import styles from './index.module.less';

const props = {
  itemDetail: {
    type: Object as PropType<ItemDetail>,
  },
  dispatch: {
    type: Function as PropType<Dispatch>,
    required: true as const,
  },
};

const Component = defineComponent({
  name: 'ArticleEdit',
  props,
  setup(props) {
    const title = ref('');
    const summary = ref('');
    const content = ref('');
    const errorMessage = ref('');
    watch(
      () => props.itemDetail,
      (itemDetail) => {
        title.value = itemDetail?.title || '';
        summary.value = itemDetail?.summary || '';
        content.value = itemDetail?.content || '';
      },
      {immediate: true}
    );
    const onSubmit = () => {
      if (!title.value || !summary.value || !content.value) {
        errorMessage.value = '请输入文章标题、摘要、内容';
      } else {
        const item = {id: props.itemDetail!.id, title: title.value, summary: summary.value, content: content.value};
        if (item.id) {
          props.dispatch(Modules.article.actions.updateItem(item));
        } else {
          props.dispatch(Modules.article.actions.createItem(item));
        }
      }
    };
    return () => (
      <>
        <NavBar title="编辑文章" />
        <div class={`${styles.root} g-page-content`}>
          <DocumentHead title="编辑文章" />
          <div class="g-form">
            <div class="item">
              <div class="item">标题</div>
              <div class="item">
                <input name="title" class="g-input" type="text" placeholder="请输入" v-model={title.value} />
              </div>
            </div>
            <div class="item">
              <div class="item">摘要</div>
              <div class="item">
                <textarea name="summary" class="g-input" placeholder="请输入" rows={2} v-model={summary.value} />
              </div>
            </div>
            <div class="item item-last">
              <div class="item">内容</div>
              <div class="item">
                <textarea name="content" class="g-input" placeholder="请输入" rows={10} v-model={content.value} />
              </div>
            </div>
            <div class="item item-error">
              <div class="item"></div>
              <div class="item">{errorMessage.value}</div>
            </div>
          </div>
          <div class="g-control">
            <button type="submit" class="g-button primary" onClick={onSubmit}>
              提 交
            </button>
            <Link class="g-button" to={1} action="back" target="window">
              取 消
            </Link>
          </div>
        </div>
      </>
    );
  },
});

export default exportView(Component);
