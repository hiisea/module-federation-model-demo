import {DocumentHead, Link, connectStore, locationToUrl} from '@elux/vue-web';
import {ListItem, ListSearch, ListSummary, defaultListSearch} from '@react-team/article-model';
import {excludeDefaultParams} from '@react-team/stage-model';
import NavBar from '@vue-team/stage/components/NavBar';
import TabBar from '@vue-team/stage/components/TabBar';
import {computed, defineComponent} from 'vue';
import {APPState, Modules, useRouter} from '@/Global';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.less';

interface StoreProps {
  prefixPathname: string;
  listSearch: ListSearch;
  list?: ListItem[];
  listSummary?: ListSummary;
}

function mapStateToProps(appState: APPState): StoreProps {
  const {prefixPathname, listSearch, list, listSummary} = appState.article!;
  return {prefixPathname, listSearch, list, listSummary};
}

const Component = defineComponent({
  name: 'ArticleList',
  setup() {
    const router = useRouter();
    const storeProps = connectStore(mapStateToProps);

    const paginationBaseUrl = computed(() =>
      locationToUrl({
        pathname: `${storeProps.prefixPathname}/list`,
        searchQuery: excludeDefaultParams(defaultListSearch, {keyword: storeProps.listSearch?.keyword, pageCurrent: 0}),
      })
    );
    const onSearch = (keyword: string) => {
      router.push(
        {pathname: `${storeProps.prefixPathname}/list`, searchQuery: excludeDefaultParams(defaultListSearch, {pageCurrent: 1, keyword})},
        'page'
      );
    };
    const onDeleteItem = (id: string) => {
      storeProps.dispatch(Modules.article.actions.deleteItem(id));
    };
    const onEditItem = (id: string = '0') => {
      router.push({url: `${storeProps.prefixPathname}/edit?id=${id}`}, 'window');
    };

    return () => {
      const {prefixPathname, listSearch, list, listSummary} = storeProps;
      return (
        <>
          <NavBar title="文章列表" />
          <div class={`${styles.root} g-page-content`}>
            <DocumentHead title="文章列表" />
            <SearchBar keyword={listSearch.keyword} onSubmit={onSearch} onCreate={onEditItem} />
            {list && listSummary && (
              <div class="list">
                {list.map((item) => (
                  <div key={item.id} class="article-item">
                    <Link class="article-title" to={`${prefixPathname}/detail?id=${item.id}`} action="push" target="window">
                      {item.title}
                    </Link>
                    <Link class="article-summary" to={`${prefixPathname}/detail?id=${item.id}`} action="push" target="window">
                      {item.summary}
                    </Link>
                    <div class="article-operation">
                      <div class="item" onClick={() => onEditItem(item.id)}>
                        修改
                      </div>
                      <div class="item" onClick={() => onDeleteItem(item.id)}>
                        删除
                      </div>
                    </div>
                  </div>
                ))}
                <Pagination totalPages={listSummary.totalPages} pageCurrent={listSummary.pageCurrent} baseUrl={paginationBaseUrl.value} />
                <Link class="g-ad" to="/shop/list" action="push" target="window">
                  -- 特惠商城，盛大开业 --
                </Link>
              </div>
            )}
          </div>
          <TabBar selected="article" />
        </>
      );
    };
  },
});

export default Component;
