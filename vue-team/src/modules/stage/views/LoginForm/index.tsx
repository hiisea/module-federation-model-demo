import {DocumentHead, Link, connectStore, exportView} from '@elux/vue-web';
import {defineComponent, ref} from 'vue';
import {GetActions} from '@/Global';
import NavBar from '../../components/NavBar';
import styles from './index.module.less';

const {stage: stageActions} = GetActions('stage');

const Component = defineComponent({
  name: 'StageLoginForm',
  setup() {
    const storeProps = connectStore();
    const errorMessage = ref('');
    const username = ref('admin');
    const password = ref('123456');
    const onSubmit = () => {
      if (!username.value || !password.value) {
        errorMessage.value = '请输入用户名、密码';
      } else {
        //这样的写法可以使用TS的类型提示，等同于dispatch({type:'stage.login',payload:{username, password}})
        //可以await这个action的所有handler执行完成
        const result = storeProps.dispatch(stageActions.login({username: username.value, password: password.value})) as Promise<void>;
        result.catch(({message}) => {
          errorMessage.value = message;
        });
      }
    };
    const onCancel = () => {
      storeProps.dispatch(stageActions.cancelLogin());
    };

    return () => (
      <>
        <NavBar title="登录" />
        <div class={`${styles.root} g-page-content`}>
          <DocumentHead title="登录" />
          <div class="g-form">
            <div class="item">
              <div class="item">用户名</div>
              <div class="item">
                <input name="username" class="g-input" type="text" placeholder="请输入" v-model={username.value} />
              </div>
            </div>
            <div class="item item-last">
              <div class="item">密码</div>
              <div class="item">
                <input name="password" class="g-input" type="text" placeholder="请输入" v-model={password.value} />
              </div>
            </div>
            <div class="item item-error">
              <div class="item"></div>
              <div class="item">{errorMessage.value}</div>
            </div>
          </div>
          <div class="g-control">
            <button type="submit" class="g-button primary" onClick={onSubmit}>
              登 录
            </button>
            <button type="button" class="g-button" onClick={onCancel}>
              取 消
            </button>
          </div>
          <Link class="g-ad" to="/shop/list" action="push" target="window" cname="">
            -- 特惠商城，盛大开业 --
          </Link>
        </div>
      </>
    );
  },
});

export default exportView(Component);
