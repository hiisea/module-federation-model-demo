import {DocumentHead, connectStore} from '@elux/vue-web';
import {Notices} from '@react-team/admin-model';
import {CurUser} from '@react-team/stage-model';
import TabBar from '@vue-team/stage/components/TabBar';
import {defineComponent} from 'vue';
import {APPState, Modules, StaticPrefix} from '@/Global';
import styles from './index.module.less';

interface StoreProps {
  curUser: CurUser;
  notices?: Notices;
}

function mapStateToProps(appState: APPState): StoreProps {
  return {curUser: appState.stage!.curUser, notices: appState.admin!.notices};
}

const Component = defineComponent({
  name: 'MyUserSummary',
  setup() {
    const storeProps = connectStore(mapStateToProps);
    const onLogout = () => storeProps.dispatch(Modules.stage.actions.logout());

    return () => {
      const {curUser, notices} = storeProps;
      return (
        <>
          <DocumentHead title="个人中心" />
          <div class={`${styles.root} g-page-content`}>
            <div class="title">个人中心</div>
            <div class="avatar" style={{backgroundImage: `url(${StaticPrefix + curUser.avatar})`}} />
            <div class="notices">{notices?.num || '..'}</div>
            <div class="nickname">{curUser.username}</div>
            <div class="score">{`✆ ${curUser.mobile}`}</div>
            <div class="logout" onClick={onLogout}>
              退出登录
            </div>
          </div>
          <TabBar selected="my" />
        </>
      );
    };
  },
});

export default Component;
