import { NavigationActions } from 'react-navigation';

import { RootStackNavigator } from '../AppNavigator';

const initialAction = { type: NavigationActions.Init };
const initialState = RootStackNavigator.router.getStateForAction(initialAction);

export default (state = initialState, action) => {
  const nextState = RootStackNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
