import { StyleSheet } from 'react-native';

import { PURPLE_TINT } from '../../styles';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#3f395c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#3f395c',
  },
  settingView: {
    flex: 1,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginTop: 15,
    backgroundColor: PURPLE_TINT,
    padding: 10,
  },
  itemInner: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  itemContentView: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContent: {
    flex: 1,
    marginVertical: 5,
  },
  itemBottom: {
    textAlign: 'right',
  },
  itemArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
});
