import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { CheckBox } from 'react-native-elements';

import { PURPLE, headerTitleStyle } from '../../../styles';
import styles from './styles';

import TouchableItem from '../../../components/TouchableItem';

const Input = ({ placeholder, secure, changeInputText }) => (
  <View style={styles.inputView}>
    <TextInput
      selectionColor={PURPLE}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      onChangeText={changeInputText}
      secureTextEntry={secure}
      style={styles.input}
    />
  </View>
);

class SignInScreen extends Component {
  state = { id: '', pw: '', autoLogin: false };

  _onLoginPress = async () => {
    const { id, pw, autoLogin } = this.state;

    if (autoLogin) {
      // const user = JSON.stringify({ id, pw, autoLogin });
      try {
        await AsyncStorage.setItem('user', 'hello');
      } catch (error) {
        console.log(error);
      }
    }

    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }));

    // setTimeout(() => {
    //   this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }));
    // }, 100);
  };

  _onCheckBoxChange = () => {
    this.setState(prevState => ({ autoLogin: !prevState.autoLogin }));
  };

  changeInputText = property => text => {
    this.setState(prevState => ({
      [property]: text.trim(),
    }));
  };

  render() {
    const { autoLogin } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Input placeholder="아이디" changeInputText={this.changeInputText('id')} />
        <Input placeholder="비밀번호" changeInputText={this.changeInputText('pw')} secure />
        <TouchableItem onPress={this._onLoginPress} pressColor="white" style={styles.buttonView}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableItem>
        <CheckBox
          checked={autoLogin}
          onPress={this._onCheckBoxChange}
          title="자동 로그인"
          textStyle={{ color: 'white' }}
          checkedColor="white"
          containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
          iconType="MaterialIcons"
          checkedIcon="check"
          uncheckedIcon="check-box-outline-blank"
          iconRight
          right
        />
      </KeyboardAvoidingView>
    );
  }
}

SignInScreen.navigationOptions = {
  title: '로그인',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: PURPLE,
    elevation: 0,
  },
  headerTitleStyle,
};

export default SignInScreen;
