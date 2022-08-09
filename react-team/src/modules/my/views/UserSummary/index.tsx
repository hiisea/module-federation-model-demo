import {Dispatch, DocumentHead, connectStore} from '@elux/react-web';
import {Notices} from '@react-team/admin-model';
import {CurUser} from '@react-team/stage-model';
import TabBar from '@react-team/stage/components/TabBar';
import {FC, useCallback} from 'react';
import {APPState, Modules, StaticPrefix} from '@/Global';
import styles from './index.module.less';

interface StoreProps {
  curUser: CurUser;
  notices?: Notices;
}

function mapStateToProps(appState: APPState): StoreProps {
  return {curUser: appState.stage!.curUser, notices: appState.admin!.notices};
}

const Component: FC<StoreProps & {dispatch: Dispatch}> = ({curUser, notices, dispatch}) => {
  const onLogout = useCallback(() => dispatch(Modules.stage.actions.logout()), [dispatch]);

  return (
    <>
      <DocumentHead title="个人中心" />
      <div className={`${styles.root} g-page-content`}>
        <div className="title">个人中心</div>
        <div className="avatar" style={{backgroundImage: `url(${StaticPrefix + curUser.avatar})`}} />
        <div className="notices">{notices?.num || '..'}</div>
        <div className="nickname">{curUser.username}</div>
        <div className="score">{`✆ ${curUser.mobile}`}</div>
        <div className="logout" onClick={onLogout}>
          退出登录
        </div>
      </div>
      <TabBar selected="my" />
    </>
  );
};

export default connectStore(mapStateToProps)(Component);
