import { combineReducers } from 'redux';

import shop from './shop';
import nav from './navigations';

export default combineReducers({
  shop,
  nav,
});
