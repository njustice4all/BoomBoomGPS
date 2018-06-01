import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';

import { actionGetAllShops, actionLoadMoreShops } from '../../actions/actionTypes';

import styles from './styles';
import { IconFeather, IconIonicons } from '../../components/Icons';

const Item = ({ item, navigation }) => (
  <TouchableNativeFeedback
    onPress={() => Linking.openURL('https://www.naver.com')}
    // onPress={() => navigation.navigate('DetailScreen', { title: item.login.username })}
    background={TouchableNativeFeedback.SelectableBackground()}>
    <View
      style={{
        backgroundColor: '#4b416e',
        marginTop: 20,
        flexDirection: 'row',
        padding: 10,
      }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          overflow: 'hidden',
        }}>
        <Image style={{ flex: 1 }} source={{ uri: item.picture.large }} />
      </View>
      <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
        <View>
          <Text style={{ color: 'white' }}>{item.login.username}</Text>
        </View>
        <View>
          <Text style={{ color: 'white' }}>
            {item.location.city} {item.location.state} {item.location.street}
          </Text>
        </View>
        <View>
          <Text style={{ color: 'white' }}>{item.email}</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
        }}>
        <IconIonicons name="ios-arrow-forward" size={22} color="white" />
      </View>
    </View>
  </TouchableNativeFeedback>
);

class HomeScreen extends PureComponent {
  state = { refreshing: false };

  static navigationOptions = ({ navigation }) => ({
    title: '아티사운드',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#5f4aa5',
      elevation: 0,
    },
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 22,
      alignSelf: 'center',
    },
    headerLeft: <View />,
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 10, borderRadius: 20 }}
        activeOpacity={0.4}
        onPress={() => navigation.navigate('SettingScreen')}>
        <View
          style={{
            flex: 1,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconFeather name="settings" size={22} color="white" />
        </View>
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    this.props.getAllShops();
  }

  onRefresh = () => {
    this.props.getAllShops();
  };

  loadMore = () => {
    this.props.loadMore();
  };

  render() {
    const { lists, isFetching, navigation } = this.props;

    if (lists.length === 0) {
      return (
        <View style={styles.container}>
          <Text>LOADING INDICATOR HERE</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={lists}
          keyExtractor={(item, index) => String(index)}
          refreshing={isFetching}
          onRefresh={this.onRefresh}
          onEndReached={this.loadMore}
          onEndReachedThreshold={1}
          renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    lists: state.shop.lists,
    isFetching: state.shop.isFetching,
  }),
  dispatch => ({
    getAllShops: () => dispatch(actionGetAllShops.request()),
    loadMore: () => dispatch(actionLoadMoreShops.request()),
  })
)(HomeScreen);
