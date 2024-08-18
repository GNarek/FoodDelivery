import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import keyBy from 'lodash/keyBy';
import {Restaurants} from '../screens/Restaurants';
import {Markets} from '../screens/Markets';
import {MyCart} from '../screens/MyCart';
import {MyOrders} from '../screens/MyOrders';
import {MyProfile} from '../screens/MyProfile';
import {MarketDetails} from '../screens/MarketDetails';
import {RootStackParamList} from '../AppNavigation/types';
import {MyOrdersDetails} from '../screens/MyOrders/screens/MyOrdersDetails';

export type ChildRoute = {
  component: React.FC<any>;
  name: keyof RootStackParamList;
  backTitle: string;
};

export type Route = {
  key: string;
  name: string;
  icon: string;
  component: React.FC<any>;
  detaiedScreens: ChildRoute[];
  IconComp: typeof Ionicons;
};

export const routes: Route[] = [
  {
    key: 'restaurants',
    name: 'Restaurants',
    icon: 'restaurant-outline',
    component: Restaurants,
    detaiedScreens: [
      {
        component: MarketDetails,
        name: 'MarketDetails',
        backTitle: 'Restaurants',
      },
    ],
    IconComp: Ionicons,
  },
  {
    key: 'market',
    name: 'Market',
    icon: 'storefront-outline',
    component: Markets,
    detaiedScreens: [],
    IconComp: Ionicons,
  },
  {
    key: 'my_cart',
    name: 'My Cart',
    icon: 'bag-handle-outline',
    component: MyCart,
    detaiedScreens: [],
    IconComp: Ionicons,
  },
  {
    key: 'my_orders',
    name: 'My Orders',
    icon: 'truck',
    component: MyOrders,
    detaiedScreens: [
      {
        component: MyOrdersDetails,
        name: 'MyOrderDetails',
        backTitle: 'My Orders',
      },
    ],
    IconComp: Feather,
  },
  {
    key: 'profile',
    name: 'My Profile',
    icon: 'user',
    component: MyProfile,
    detaiedScreens: [],
    IconComp: Feather,
  },
];

export const routesMap = keyBy(routes, 'name');
