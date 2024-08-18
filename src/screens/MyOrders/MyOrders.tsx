import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchOrders} from '../../api/orders';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../styles/colors';
import {MyOrderItem} from './screens/MyOrdersDetails/MyOrderItem';

export type Order = {
  id: number;
  orderDate: string;
  price: number;
  currencyData?: {
    symbol: string;
  };
  // TODO: Add other properties as needed
};

export const MyOrders: React.FC = () => {
  const {data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status} =
    useInfiniteQuery({
      queryKey: ['orders'],
      queryFn: fetchOrders,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
      initialPageParam: 1,
    });

  const renderItem = ({item}: {item: Order}) => <MyOrderItem item={item} />;

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={colors.red}
        />
      );
    }
    return null;
  };

  if (status === 'pending') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  if (status === 'error') {
    return <Text>Error: {(error as Error).message}</Text>;
  }

  return (
    <FlatList
      data={data?.pages.flatMap(page => page) ?? []}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
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
  loader: {
    marginVertical: 20,
  },
});
