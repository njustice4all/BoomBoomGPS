import React, { PureComponent } from 'react';
import { View, Text, FlatList, Image, Linking } from 'react-native';
import { connect } from 'react-redux';

import { actionGetAllShops, actionLoadMoreShops } from '../../actions/actionTypes';

import { PURPLE, headerTitleStyle } from '../../styles';
import styles from './styles';
import { IconFeather, IconIonicons } from '../../components/Icons';
import TouchableItem from '../../components/TouchableItem';

const Item = ({ item, navigation, onItemPress }) => (
  <TouchableItem style={styles.itemContainer} onPress={onItemPress(navigation, item)}>
    <View style={styles.itemInner}>
      <View style={styles.itemImage}>
        <Image style={styles.image} source={{ uri: item.picture.large }} />
      </View>
      <View style={styles.itemContentView}>
        <View>
          <Text style={styles.itemText}>{item.login.username}</Text>
        </View>
        <View>
          <Text style={styles.itemText}>
            {item.location.city} {item.location.state} {item.location.street}
          </Text>
        </View>
        <View>
          <Text style={styles.itemText}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.itemArrow}>
        <IconIonicons name="ios-arrow-forward" size={22} color="white" />
      </View>
    </View>
  </TouchableItem>
);

class HomeScreen extends PureComponent {
  state = { refreshing: false };

  componentDidMount() {
    this.props.getAllShops();
  }

  _onRefresh = () => {
    this.props.getAllShops();
  };

  _loadMore = () => {
    this.props.loadMore();
  };

  onItemPress = (navigation, item) => () => {
    // FIXME:
    Linking.openURL('https://www.naver.com');
    // navigation.navigate('DetailScreen', { title: item.login.username });
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
          onRefresh={this._onRefresh}
          onEndReached={this._loadMore}
          onEndReachedThreshold={1}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} onItemPress={this.onItemPress} />
          )}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: '아티사운드',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: PURPLE,
    elevation: 0,
  },
  headerTitleStyle,
  headerLeft: <View />,
  headerRight: (
    <TouchableItem
      onPressIn={() =>
        setTimeout(() => {
          navigation.navigate('SettingScreen');
        }, 100)
      }
      borderless>
      <View style={styles.settingView}>
        <IconFeather name="settings" size={22} color="white" />
      </View>
    </TouchableItem>
  ),
});

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
