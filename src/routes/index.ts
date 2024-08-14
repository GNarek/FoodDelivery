import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Restaurants} from '../screens/Restaurants';
import {Market} from '../screens/Market';
import {MyCart} from '../screens/MyCart';
import {MyOrders} from '../screens/MyOrders';
import {MyProfile} from '../screens/MyProfile';
import keyBy from 'lodash/keyBy';

export const routes = [
  {
    key: 'restourants',
    name: 'Restourants',
    icon: 'restaurant-outline',
    component: Restaurants,
    IconComp: Ionicons,
  },
  {
    key: 'market',
    name: 'Market',
    icon: 'storefront-outline',
    component: Market,
    IconComp: Ionicons,
  },
  {
    key: 'my_cart',
    name: 'My Cart',
    icon: 'bag-handle-outline',
    component: MyCart,
    IconComp: Ionicons,
  },
  {
    key: 'my_orders',
    name: 'My Orders',
    icon: 'truck',
    component: MyOrders,
    IconComp: Feather,
  },
  {
    key: 'profile',
    name: 'My Profile',
    icon: 'user',
    component: MyProfile,
    IconComp: Feather,
  },
];

export const routesMap = keyBy(routes, 'name');
