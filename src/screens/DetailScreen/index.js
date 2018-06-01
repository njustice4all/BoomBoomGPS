import React, { Component } from 'react';
import { View, WebView } from 'react-native';

class DetailScreen extends Component {
  static navigationOptions = () => ({ header: null });

  render() {
    console.log(this.props.navigation.state.params.title);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#3f395c',
        }}>
        <WebView style={{ flex: 1 }} source={{ uri: 'https://www.naver.com' }} />
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            width: 75,
            height: 75,
            borderRadius: 50,
            backgroundColor: 'red',
          }}
        />
      </View>
    );
  }
}

export default DetailScreen;
