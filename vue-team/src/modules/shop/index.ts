import {exportModule} from '@elux/vue-web';
import {Model} from '@react-team/shop-model';
import main from './views/Main';

export default exportModule('shop', Model, {main});
