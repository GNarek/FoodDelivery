import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Main: undefined;
  MarketDetails: {marketId: any}; // Define the parameters for DetailsScreen
};

// Define a type for the navigation prop
export type MarketItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MarketDetails'
>;

// If you need to access route params, you can define a route prop type too
export type DetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'MarketDetails'
>;
