import {exportModule} from '@elux/react-web';
import {Model} from '@react-team/shop-model';
import main from './views/Main';

export default exportModule('shop', Model, {main});
