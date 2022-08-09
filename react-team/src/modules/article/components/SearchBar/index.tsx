import {FC, memo, useCallback, useMemo, useState} from 'react';
import styles from './index.module.less';

interface Props {
  keyword: string;
  onSubmit: (keyword: string) => void;
  onCreate: () => void;
}

const Component: FC<Props> = (props) => {
  const {onSubmit, onCreate} = props;
  const [keyword, setKeyword] = useState(props.keyword);
  useMemo(() => {
    setKeyword(props.keyword);
  }, [props.keyword]);
  const onSubmitHandler = useCallback(() => {
    onSubmit(keyword);
  }, [keyword, onSubmit]);
  const onCreateHandler = useCallback(() => {
    onCreate();
  }, [onCreate]);

  return (
    <div className={styles.root}>
      <input
        className="keyword"
        name="keyword"
        type="text"
        placeholder="请输入搜索关键字..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.trim())}
      />
      <button className="search" onClick={onSubmitHandler}>
        搜索
      </button>
      <div className="add" onClick={onCreateHandler}>
        +新增
      </div>
    </div>
  );
};

export default memo(Component);
