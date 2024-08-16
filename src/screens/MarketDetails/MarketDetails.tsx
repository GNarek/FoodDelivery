import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  MarketDetails: {marketId: any};
};

type MarketDetailsRouteProp = RouteProp<RootStackParamList, 'MarketDetails'>;

export const MarketDetails = ({route}: {route: MarketDetailsRouteProp}) => {
  const {marketId} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Details</Text>
      <Text style={styles.marketId}>Market ID: {marketId}</Text>
      {/* Fetch and display more details using marketId */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  marketId: {
    fontSize: 18,
    marginTop: 20,
  },
});
