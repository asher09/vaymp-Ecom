import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';
import { store, persistor } from './src/redux/store';
import { BottomTabNavigator } from './src/components/BottomTabNavigator';
import { colors } from './src/styles/colors';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          }
          persistor={persistor}
        >
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
