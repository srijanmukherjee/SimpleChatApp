import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from './config';

GoogleSignin.configure({
    webClientId: Config.GOOGLE_SIGNIN_WEB_CLIENT_ID
});

AppRegistry.registerComponent(appName, () => App);
