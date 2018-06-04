import React, { Component } from 'react';
import { Easing, Animated, StatusBar, SafeAreaView } from 'react-native';
import { createStackNavigator, SwitchNavigator } from 'react-navigation';
import { initializeListeners } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { navigationPropConstructor } from './utils/reduxNavigation';

import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import DetailScreen from './screens/DetailScreen';
import { SignInScreen, LoadingScreen } from './screens/Authentication';

const AuthStack = createStackNavigator({
  SignInScreen,
});

const RootStack = createStackNavigator(
  {
    HomeScreen,
    SettingScreen,
    DetailScreen,
  },
  {
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;

        const thisSceneIndex = scene.index;
        const width = layout.initWidth;

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        });

        return { transform: [{ translateX }] };
      },
    }),
  }
);

export const AppStackNavigator = SwitchNavigator(
  {
    LoadingScreen,
    AuthStack,
    RootStack,
  },
  {
    initialRouteName: 'LoadingScreen',
  }
);

class AppNavigator extends Component {
  componentDidMount() {
    initializeListeners('root', this.props.nav);
  }

  render() {
    const { dispatch, nav } = this.props;

    const navigation = navigationPropConstructor(dispatch, nav);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <AppStackNavigator navigation={navigation} />
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  nav: state.nav,
}))(AppNavigator);
