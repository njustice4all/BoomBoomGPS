import React from 'react';
import { AsyncStorage, Text, View, Switch } from 'react-native';

import { PURPLE, headerTitleStyle } from '../../styles';
import styles from './styles';

import { IconIonicons } from '../../components/Icons';
import TouchableItem from '../../components/TouchableItem';
import BoomBoomGPS from '../../modules/BoomBoomGPS';

const TouchablaRow = ({ title, onPress }) => (
  <TouchableItem style={styles.rows} onPress={onPress}>
    <View style={styles.innerView}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <IconIonicons name="ios-arrow-forward" size={22} color="white" />
      </View>
    </View>
  </TouchableItem>
);

class SettingScreen extends React.Component {
  state = { status: true };

  componentDidMount = async () => {
    await BoomBoomGPS.getListenStatus().then(status => {
      this.setState(prevState => ({ status }));
    });
  };

  onGpsPress = async () => {
    await BoomBoomGPS.setGPS();
  };

  _onSwitchChange = status => {
    this.setState(prevState => ({ status }));
    BoomBoomGPS.setListenStatus(status);
  };

  onSignOutPress = async () => {
    await AsyncStorage.clear();

    this.props.navigation.navigate('SignInScreen');
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
              onValueChange={this._onSwitchChange}
              onTintColor={PURPLE}
              thumbTintColor="white"
            />
          </View>
        </View>

        <TouchablaRow title="GPS설정 바로가기" onPress={this.onGpsPress} />
        <TouchablaRow title="로그아웃" onPress={this.onSignOutPress} />

        <View style={styles.remainView} />
      </View>
    );
  }
}

SettingScreen.navigationOptions = {
  title: '설 정',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: PURPLE,
    elevation: 0,
  },
  headerTitleStyle,
  headerRight: <View />,
};

export default SettingScreen;
