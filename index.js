import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

// isMounted bug 18.05.21
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('BoomBoomGPS', () => App);
