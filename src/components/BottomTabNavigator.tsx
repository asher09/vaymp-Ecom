import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ProductsScreen } from '../screens/ProductsScreen';
import { BagScreen } from '../screens/BagScreen';
import { colors } from '../styles/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProductsList" component={ProductsScreen} />
  </Stack.Navigator>
);

const BagStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BagList" component={BagScreen} />
  </Stack.Navigator>
);

export const BottomTabNavigator = () => {
  const bagItemsCount = useSelector(
    (state: RootState) => state.bag.items.length
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 4,
          height: 56,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Bag"
        component={BagStack}
        options={{
          tabBarLabel: 'Bag',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-outline" size={size} color={color} />
          ),
          tabBarBadge: bagItemsCount > 0 ? bagItemsCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.secondary,
            color: colors.white,
          },
        }}
      />
    </Tab.Navigator>
  );
};
