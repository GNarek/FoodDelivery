import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {fetchMarketById} from '../../api/market';
import {useQuery} from '@tanstack/react-query';
import {colors} from '../../styles/colors';
import {MarketDetailsList} from './MarketDeatilsList/MarketDeatilsList';

type RootStackParamList = {
  MarketDetails: {marketId: any};
};

type MarketDetailsRouteProp = RouteProp<RootStackParamList, 'MarketDetails'>;

type Props = {route: MarketDetailsRouteProp};

export const MarketDetails: React.FC<Props> = props => {
  const {route} = props;
  const {marketId} = route.params;
  const {data, error, isLoading} = useQuery({
    queryKey: ['market', marketId],
    queryFn: () => fetchMarketById(marketId),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MarketDetailsList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  marketId: {
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
  },
});
