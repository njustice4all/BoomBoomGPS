import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);

    this._onAuthentication();
  }

  _onAuthentication = async () => {
    try {
      console.log('....');
      const user = await AsyncStorage.getItem('user');
      console.log('why ???????????');
      this.props.navigation.navigate(user ? 'HomeScreen' : 'SignInScreen');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

LoadingScreen.navigationOptions = {
  header: null,
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
