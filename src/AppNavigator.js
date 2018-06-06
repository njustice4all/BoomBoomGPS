import React, { Component } from 'react';
import { StatusBar, SafeAreaView, Easing, Animated } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
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
      // https://medium.com/async-la/custom-transitions-in-react-navigation-2f759408a053
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const {
          position, layout, scene, index, scenes,
        } = sceneProps;
        const toIndex = index;
        const thisSceneIndex = scene.index;
        const height = layout.initHeight;
        const width = layout.initWidth;

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0],
        });

        const translateY = position.interpolate({
          inputRange: [0, thisSceneIndex],
          outputRange: [height, 0],
        });

        const slideFromRight = { transform: [{ translateX }] };
        const slideFromBottom = { transform: [{ translateY }] };

        const lastSceneIndex = scenes[scenes.length - 1].index;

        if (lastSceneIndex - toIndex > 1) {
          if (scene.index === toIndex) return;
          if (scene.index !== lastSceneIndex) return { opacity: 0 };
          return slideFromBottom;
        }
        return slideFromRight;
      },
    }),
  }
);

export const AppStackNavigator = createSwitchNavigator(
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
