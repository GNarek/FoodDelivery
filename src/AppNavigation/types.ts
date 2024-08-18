import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Main: undefined;
  MarketDetails: {marketId: any};
  MyOrderDetails: {orderId: any};
};

export type MarketItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MarketDetails'
>;

export type MyOrderItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyOrderDetails'
>;

export type DetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'MarketDetails'
>;
