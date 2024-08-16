/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {routes, routesMap} from '../routes';
import {colors} from '../styles/colors';
import {MarketDetails} from '../screens/MarketDetails';
import {RootStackParamList} from './types';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const createScreenStack = (Component: any) => () =>
  (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Component}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MarketDetails"
        component={MarketDetails}
        options={{
          headerBackTitle: 'Restaurants',
        }}
      />
    </Stack.Navigator>
  );

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            const routeData = routesMap[route.name];
            return (
              <routeData.IconComp
                name={routeData.icon}
                size={size}
                color={color}
              />
            );
          },
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? colors.red : 'gray', fontSize: 12}}>
              {route.name}
            </Text>
          ),
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {paddingBottom: 5, height: 60},
        })}>
        {routes.map(route => (
          <Tab.Screen
            key={route.key}
            name={route.name}
            component={createScreenStack(route.component)}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
