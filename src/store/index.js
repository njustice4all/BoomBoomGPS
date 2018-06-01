import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';

import rootSaga from '../sagas';
import reducer from '../reducers';

export default function configureStore(initialState) {
  // crate saga
  const sagaMiddleware = createSagaMiddleware();

  // logger option
  const logger = createLogger({ collapsed: true });

  const middlewares = [sagaMiddleware];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push(logger);
  }

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);

  return store;
}
