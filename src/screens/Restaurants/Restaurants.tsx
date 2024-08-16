import {useEffect, useMemo} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import {fetchMarkets} from '../../api/markets';
import {MarketsList} from './MarketsList';
import Config from '../../configs';
import {colors} from '../../styles/colors';

export const Restaurants = () => {
  const {data, error, isLoading} = useQuery({
    queryKey: ['markets'],
    queryFn: fetchMarkets,
  });

  useEffect(() => {
    if (data?.appSettings?.imageServer) {
      Config.setBaseImageUrl(data?.appSettings?.imageServer);
    }
  }, [data?.appSettings?.imageServer]);

  // Filter categories to include only those relevant to the current ticket: vertical and horizontal market categories.
  const filteredCategories = useMemo(() => {
    if (!data?.categories.length) {
      return [];
    }

    return data.categories.filter(
      (category: any) =>
        category.elementType === 'MarketVerticalCategory' ||
        category.elementType === 'MarketHorizontalCategory',
    );
  }, [data?.categories]);

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
      <MarketsList categories={filteredCategories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  errorText: {
    color: 'red',
  },
  marketContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  marketName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
