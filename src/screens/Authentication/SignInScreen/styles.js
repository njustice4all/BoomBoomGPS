import { StyleSheet } from 'react-native';

import { PURPLE, PURPLE_DARK } from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PURPLE_DARK,
    padding: 20,
  },
  inputView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderBottomWidth: 0,
    fontSize: 20,
  },
  buttonView: {
    backgroundColor: PURPLE,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
  },
});
