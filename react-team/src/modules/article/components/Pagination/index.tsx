import {Link} from '@elux/react-web';
import {FC, memo} from 'react';
import styles from './index.module.less';

interface Props {
  totalPages: number;
  pageCurrent: number;
  baseUrl: string;
}

function replacePageNumber(baseUrl: string, pageCurrent: number): string {
  return baseUrl.replace('pageCurrent=0', `pageCurrent=${pageCurrent}`);
}

const Component: FC<Props> = ({totalPages, pageCurrent, baseUrl}) => {
  return (
    <div className={styles.root}>
      {pageCurrent > 1 && (
        <Link className="item" action="push" target="page" to={replacePageNumber(baseUrl, pageCurrent - 1)}>
          上一页
        </Link>
      )}
      {pageCurrent < totalPages && (
        <Link className="item" action="push" target="page" to={replacePageNumber(baseUrl, pageCurrent + 1)}>
          下一页
        </Link>
      )}
      <div className="info">{`- 第 ${pageCurrent} 页 / 共 ${totalPages} 页 -`}</div>
    </div>
  );
};

export default memo(Component);
