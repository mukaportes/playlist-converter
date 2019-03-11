import _ from 'lodash';
import numberHelpers from './numbers';

const loadMixins = () => {
  _.mixin({ ...numberHelpers });
};

export default loadMixins;
