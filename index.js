import { AppRegistry, Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';

// Register the root component for Expo (Web and Native Dev Client)
registerRootComponent(App);

// Additional registration for Native MainActivity.ktgetMainComponentName() which returns 'VayampEcommerce'
if (Platform.OS !== 'web') {
  AppRegistry.registerComponent('VayampEcommerce', () => App);
}
