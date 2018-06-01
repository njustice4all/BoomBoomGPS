import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppNavigator from './AppNavigator';
import configureStore from './store';

const store = configureStore(undefined);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
