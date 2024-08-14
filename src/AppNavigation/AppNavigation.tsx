import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {routes, routesMap} from '../routes';
import {colors} from '../styles/colors';

const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
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
            component={route.component}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
