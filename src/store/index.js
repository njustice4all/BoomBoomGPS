import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';
import { navigationMiddleware } from '../utils/reduxNavigation';

import rootSaga from '../sagas';
import reducer from '../reducers';

export default function configureStore(initialState) {
  // crate saga
  const sagaMiddleware = createSagaMiddleware();

  // logger option
  const logger = createLogger({ collapsed: true });

  /** ************************************************** */
  /** ***************** middlewares ******************** */
  /** ************************************************** */
  const middlewares = [sagaMiddleware, navigationMiddleware, logger];

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);

  return store;
}
