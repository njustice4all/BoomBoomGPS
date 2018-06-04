import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, CheckBox, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { PURPLE, headerTitleStyle } from '../../styles';
import styles from './styles';
import TouchableItem from '../../components/TouchableItem';

const Input = ({ placeholder, secure }) => (
  <View style={styles.inputView}>
    <TextInput
      placeholder={placeholder}
      underlineColorAndroid="transparent"
      selectionColor={PURPLE}
      secureTextEntry={secure}
      style={styles.input}
    />
  </View>
);

class SignInScreen extends Component {
  static navigationOptions = {
    title: '로그인',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: PURPLE,
      elevation: 0,
    },
    headerTitleStyle,
  };

  _onPress = () => {
    setTimeout(() => {
      this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'HomeScreen' }));
    }, 100);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Input placeholder="아이디" />
        <Input placeholder="비밀번호" secure />
        <TouchableItem onPress={this._onPress} pressColor="white" style={styles.buttonView}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableItem>
        <CheckBox />
      </KeyboardAvoidingView>
    );
  }
}

export default SignInScreen;
