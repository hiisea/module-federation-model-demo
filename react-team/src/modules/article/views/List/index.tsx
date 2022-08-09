import {Dispatch, DocumentHead, Link, connectStore, locationToUrl} from '@elux/react-web';
import {ListItem, ListSearch, ListSummary, defaultListSearch} from '@react-team/article-model';
import {excludeDefaultParams} from '@react-team/stage-model';
import NavBar from '@react-team/stage/components/NavBar';
import TabBar from '@react-team/stage/components/TabBar';
import {FC, useCallback, useMemo} from 'react';
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

const Component: FC<StoreProps & {dispatch: Dispatch}> = ({prefixPathname, listSearch, list, listSummary, dispatch}) => {
  const router = useRouter();
  const paginationBaseUrl = useMemo(
    () =>
      locationToUrl({
        pathname: `${prefixPathname}/list`,
        searchQuery: excludeDefaultParams(defaultListSearch, {keyword: listSearch?.keyword, pageCurrent: 0}),
      }),
    [listSearch?.keyword, prefixPathname]
  );
  const onSearch = useCallback(
    (keyword: string) => {
      router.push({pathname: `${prefixPathname}/list`, searchQuery: excludeDefaultParams(defaultListSearch, {keyword})}, 'page');
    },
    [router, prefixPathname]
  );
  const onDeleteItem = useCallback(
    (id) => {
      dispatch(Modules.article.actions.deleteItem(id));
    },
    [dispatch]
  );
  const onEditItem = useCallback(
    (id = '0') => {
      router.push({url: `${prefixPathname}/edit?id=${id}`}, 'window');
    },
    [router, prefixPathname]
  );

  return (
    <>
      <NavBar title="文章列表" />
      <div className={`${styles.root} g-page-content`}>
        <DocumentHead title="文章列表" />
        <SearchBar keyword={listSearch.keyword} onSubmit={onSearch} onCreate={onEditItem} />
        {list && listSummary && (
          <div className="list">
            {list.map((item) => (
              <div key={item.id} className="article-item">
                <Link className="article-title" to={`${prefixPathname}/detail?id=${item.id}`} action="push" target="window">
                  {item.title}
                </Link>
                <Link className="article-summary" to={`${prefixPathname}/detail?id=${item.id}`} action="push" target="window">
                  {item.summary}
                </Link>
                <div className="article-operation">
                  <div className="item" onClick={() => onEditItem(item.id)}>
                    修改
                  </div>
                  <div className="item" onClick={() => onDeleteItem(item.id)}>
                    删除
                  </div>
                </div>
              </div>
            ))}
            <Pagination totalPages={listSummary.totalPages} pageCurrent={listSummary.pageCurrent} baseUrl={paginationBaseUrl} />
            <Link className="g-ad" to="/shop/list" action="push" target="window">
              -- 特惠商城，盛大开业 --
            </Link>
          </div>
        )}
      </div>
      <TabBar selected="article" />
    </>
  );
};

export default connectStore(mapStateToProps)(Component);
