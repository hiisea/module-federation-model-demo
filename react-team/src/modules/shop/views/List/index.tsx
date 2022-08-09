import {DocumentHead, exportView} from '@elux/react-web';
import NavBar from '@react-team/stage/components/NavBar';
import {FC, memo} from 'react';
import styles from './index.module.less';

const Component: FC = () => {
  return (
    <>
      <NavBar title="商品列表" onBack />
      <div className={styles.root + ' g-page-content'}>
        <DocumentHead title="商品列表" />
        <div className="note">本页面主要用来演示小程序下的“分包加载”</div>
        <div className="list">
          <div className="item">---商品1---</div>
          <div className="item">---商品2---</div>
          <div className="item">---商品3---</div>
        </div>
      </div>
    </>
  );
};

export default exportView(memo(Component));
