import { NavigationActions } from 'react-navigation';

import { AppStackNavigator } from '../AppNavigator';

const initialAction = { type: NavigationActions.Init };
const initialState = AppStackNavigator.router.getStateForAction(initialAction);

export default (state = initialState, action) => {
  const nextState = AppStackNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
