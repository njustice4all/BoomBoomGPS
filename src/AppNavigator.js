import React, { Component } from 'react';
import { Easing, Animated, StatusBar, SafeAreaView } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import DetailScreen from './screens/DetailScreen';

export const RootStackNavigator = new StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    SettingScreen: { screen: SettingScreen },
    DetailScreen: { screen: DetailScreen },
  },
  {
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    initialRouteName: 'HomeScreen',
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

class AppNavigator extends Component {
  render() {
    const { dispatch, nav } = this.props;

    const navigation = addNavigationHelpers({ dispatch, state: nav });

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <RootStackNavigator navigation={navigation} />
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  nav: state.nav,
}))(AppNavigator);
