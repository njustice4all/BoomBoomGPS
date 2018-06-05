import { StyleSheet } from 'react-native';

import { PURPLE_DARK, PURPLE_TINT } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PURPLE_DARK,
  },
  rows: {
    marginTop: 15,
    backgroundColor: PURPLE_TINT,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    padding: 20,
  },
  innerView: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  iconWrapper: {
    paddingRight: 5,
  },
  remainView: {
    flex: 1,
    backgroundColor: PURPLE_TINT,
    marginTop: 20,
  },
});
