import {
  createReactNavigationReduxMiddleware,
  createNavigationPropConstructor,
} from 'react-navigation-redux-helpers';

const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const navigationPropConstructor = createNavigationPropConstructor('root');

export { navigationMiddleware, navigationPropConstructor };
