import React from 'react';
import { Text, View, Switch, TouchableNativeFeedback } from 'react-native';

import { PURPLE, headerTitleStyle } from '../../styles';
import styles from './styles';
import { IconIonicons } from '../../components/Icons';
import BoomBoomGPS from '../../modules/BoomBoomGPS';

class SettingScreen extends React.Component {
  state = { status: true };

  static navigationOptions = {
    title: '설 정',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: PURPLE,
      elevation: 0,
    },
    headerTitleStyle,
    headerRight: <View />,
  };

  componentDidMount = () => {
    BoomBoomGPS.getListenStatus().then(status => {
      this.setState(prevState => ({ status }));
    });
  };

  _onPress = () => {
    BoomBoomGPS.setGPS();
  };

  _onValueChange = status => {
    this.setState(prevState => ({ status }));
    BoomBoomGPS.setListenStatus(status);
  };

  render() {
    const { status } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.rows}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>아티사운드 서비스</Text>
          </View>

          <View>
            <Switch
              value={status}
              onValueChange={this._onValueChange}
              onTintColor="#836fc6"
              thumbTintColor="white"
            />
          </View>
        </View>

        <TouchableNativeFeedback
          onPress={this._onPress}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.rows}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>GPS설정 바로가기</Text>
            </View>
            <View style={styles.iconWrapper}>
              <IconIonicons name="ios-arrow-forward" size={22} color="white" />
            </View>
          </View>
        </TouchableNativeFeedback>

        <View style={{ flex: 1, backgroundColor: '#4b416e', marginTop: 20 }} />
      </View>
    );
  }
}

export default SettingScreen;
