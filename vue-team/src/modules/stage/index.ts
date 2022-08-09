//封装并导出本模块
import {exportModule} from '@elux/vue-web';
import {Model} from '@react-team/stage-model';
import main from './views/Main';

export default exportModule('stage', Model, {main});
